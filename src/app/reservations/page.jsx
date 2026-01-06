"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Building2, 
  Calendar,
  Users,
  CreditCard,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  RefreshCw
} from "lucide-react";

export default function ReservationsPage() {
  const [chambres, setChambres] = useState([]);
  const [clients, setClients] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("reservations");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [chambresRes, clientsRes, reservationsRes] = await Promise.all([
        fetch("/api/chambres"),
        fetch("/api/clients"),
        fetch("/api/reservations")
      ]);
      
      if (chambresRes.ok) setChambres(await chambresRes.json());
      if (clientsRes.ok) setClients(await clientsRes.json());
      if (reservationsRes.ok) setReservations(await reservationsRes.json());
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    }
    setLoading(false);
  };

  const openModal = (type, data = {}) => {
    setModalType(type);
    setFormData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = modalType.includes("chambre") ? "/api/chambres" 
                   : modalType.includes("client") ? "/api/clients" 
                   : "/api/reservations";
    
    const method = modalType.includes("edit") ? "PUT" : "POST";
    
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setMessage({ type: "success", text: "Opération réussie!" });
        fetchData();
        setTimeout(closeModal, 1500);
      } else {
        const error = await res.json();
        setMessage({ type: "error", text: error.message || "Une erreur est survenue" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erreur de connexion" });
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément?")) return;
    
    const endpoint = type === "chambre" ? `/api/chambres?id=${id}`
                   : type === "client" ? `/api/clients?id=${id}`
                   : `/api/reservations?id=${id}`;
    
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (res.ok) {
        fetchData();
        setMessage({ type: "success", text: "Supprimé avec succès!" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erreur lors de la suppression" });
    }
  };

  const tabs = [
    { id: "reservations", label: "Réservations", icon: Calendar, count: reservations.length },
    { id: "chambres", label: "Chambres", icon: Building2, count: chambres.length },
    { id: "clients", label: "Clients", icon: Users, count: clients.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Retour</span>
              </Link>
              <div className="w-px h-6 bg-gray-200" />
              <div className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-lg">Gestion Hôtel</span>
              </div>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 transition-all ${
                  activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
          <button
            onClick={() => openModal(`new-${activeTab.slice(0, -1)}`)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            <Plus className="h-4 w-4" />
            Ajouter {activeTab === "reservations" ? "une réservation" : activeTab === "chambres" ? "une chambre" : "un client"}
          </button>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : activeTab === "reservations" ? (
          <div className="grid gap-4">
            {reservations.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Aucune réservation</h3>
                <p className="text-gray-500 mt-1">Commencez par créer une nouvelle réservation</p>
              </div>
            ) : (
              reservations.map((res) => (
                <div key={res.id} className="bg-white rounded-xl border p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{res.code}</h3>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            res.etat === 'Confirmee' ? 'bg-green-100 text-green-700' :
                            res.etat === 'EnCours' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {res.etat}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Client: {res.client?.nom} {res.client?.prenom}
                        </p>
                        <p className="text-sm text-gray-500">
                          Du {new Date(res.dateDebut).toLocaleDateString('fr-FR')} au {new Date(res.dateFin).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete('reservation', res.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : activeTab === "chambres" ? (
          <div className="grid md:grid-cols-3 gap-4">
            {chambres.length === 0 ? (
              <div className="col-span-3 text-center py-20 bg-white rounded-xl border">
                <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Aucune chambre</h3>
                <p className="text-gray-500 mt-1">Ajoutez des chambres pour commencer</p>
              </div>
            ) : (
              chambres.map((chambre) => (
                <div key={chambre.id} className="bg-white rounded-xl border p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-indigo-600" />
                    </div>
                    <button
                      onClick={() => handleDelete('chambre', chambre.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-4">Chambre {chambre.numero}</h3>
                  <p className="text-sm text-gray-500 mt-1">{chambre.telephone}</p>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {clients.length === 0 ? (
              <div className="col-span-2 text-center py-20 bg-white rounded-xl border">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Aucun client</h3>
                <p className="text-gray-500 mt-1">Ajoutez des clients pour commencer</p>
              </div>
            ) : (
              clients.map((client) => (
                <div key={client.id} className="bg-white rounded-xl border p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{client.nom} {client.prenom}</h3>
                        <p className="text-sm text-gray-500 mt-1">{client.adresse}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {client.reservations?.length || 0} réservation(s)
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete('client', client.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {modalType.includes("reservation") && "Nouvelle Réservation"}
                {modalType.includes("chambre") && "Nouvelle Chambre"}
                {modalType.includes("client") && "Nouveau Client"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {modalType.includes("chambre") && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro</label>
                    <input
                      type="text"
                      required
                      value={formData.numero || ""}
                      onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 101"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="text"
                      required
                      value={formData.telephone || ""}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: +212 600000000"
                    />
                  </div>
                </>
              )}
              {modalType.includes("client") && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        required
                        value={formData.nom || ""}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <input
                        type="text"
                        required
                        value={formData.prenom || ""}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <input
                      type="text"
                      required
                      value={formData.adresse || ""}
                      onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
              {modalType.includes("reservation") && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                    <select
                      required
                      value={formData.clientId || ""}
                      onChange={(e) => setFormData({ ...formData, clientId: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sélectionner un client</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.nom} {client.prenom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
                      <input
                        type="date"
                        required
                        value={formData.dateDebut || ""}
                        onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
                      <input
                        type="date"
                        required
                        value={formData.dateFin || ""}
                        onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chambre(s)</label>
                    <select
                      multiple
                      value={formData.chambreIds || []}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        chambreIds: Array.from(e.target.selectedOptions, option => parseInt(option.value))
                      })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                    >
                      {chambres.map((chambre) => (
                        <option key={chambre.id} value={chambre.id}>
                          Chambre {chambre.numero}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Maintenez Ctrl/Cmd pour sélectionner plusieurs</p>
                  </div>
                </>
              )}

              {message.text && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}>
                  {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  {message.text}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
