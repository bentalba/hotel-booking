import Link from "next/link";
import { 
  Building2, 
  Calendar, 
  Users, 
  Star, 
  Wifi, 
  Car, 
  Coffee, 
  Waves,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl">Hôtel EMSI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#chambres" className="text-gray-600 hover:text-blue-600 transition-colors">Chambres</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/reservations" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg"
              >
                Réserver
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm">Hôtel 5 étoiles - Casablanca</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Vivez une Expérience 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"> Inoubliable</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Découvrez le luxe et le confort au cœur de Casablanca. Notre hôtel vous offre 
                des chambres élégantes, un service exceptionnel et une expérience unique.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/reservations" 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  Réserver Maintenant
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a 
                  href="#chambres" 
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  Voir les Chambres
                </a>
              </div>
              <div className="flex items-center gap-8 mt-12">
                <div>
                  <div className="text-4xl font-bold text-yellow-400">250+</div>
                  <div className="text-gray-400">Chambres Luxueuses</div>
                </div>
                <div className="w-px h-12 bg-gray-600" />
                <div>
                  <div className="text-4xl font-bold text-yellow-400">98%</div>
                  <div className="text-gray-400">Clients Satisfaits</div>
                </div>
                <div className="w-px h-12 bg-gray-600" />
                <div>
                  <div className="text-4xl font-bold text-yellow-400">15+</div>
                  <div className="text-gray-400">Années dExpérience</div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <h3 className="font-semibold text-gray-900 mb-4">Réservation Rapide</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Date darrivée</label>
                      <input type="date" className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Date de départ</label>
                      <input type="date" className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Nombre de personnes</label>
                      <select className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500">
                        <option>1 Personne</option>
                        <option>2 Personnes</option>
                        <option>3 Personnes</option>
                        <option>4+ Personnes</option>
                      </select>
                    </div>
                    <Link 
                      href="/reservations"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                      Vérifier Disponibilité
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Room Types Section */}
      <section id="chambres" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold">Nos Chambres</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Chambres & Suites</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Choisissez parmi notre sélection de chambres élégantes, conçues pour votre confort absolu
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Chambre Standard",
                price: "800 MAD",
                description: "Parfaite pour un séjour confortable avec toutes les commodités essentielles.",
                features: ["Lit Queen Size", "Vue sur la ville", "Wifi gratuit", "Petit-déjeuner inclus"],
                popular: false
              },
              {
                name: "Chambre Deluxe",
                price: "1,200 MAD",
                description: "Espace généreux avec des finitions haut de gamme et vue panoramique.",
                features: ["Lit King Size", "Vue mer", "Wifi gratuit", "Petit-déjeuner + Spa"],
                popular: true
              },
              {
                name: "Suite Royale",
                price: "2,500 MAD",
                description: "Le summum du luxe avec salon privé et services personnalisés.",
                features: ["Suite complète", "Vue panoramique", "Butler service", "Accès VIP"],
                popular: false
              }
            ].map((room, index) => (
              <div 
                key={index} 
                className={`relative rounded-2xl border transition-all hover:shadow-xl ${
                  room.popular ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200'
                }`}
              >
                {room.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                      Plus Populaire
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mb-6 flex items-center justify-center">
                    <Building2 className="h-20 w-20 text-blue-600/50" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{room.description}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-blue-600">{room.price}</span>
                    <span className="text-gray-500"> / nuit</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {room.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/reservations"
                    className={`mt-6 w-full py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                      room.popular 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Réserver
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold">Nos Services</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Services Premium</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Profitez de nos services exceptionnels pour un séjour inoubliable
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Wifi, name: "Wifi Haut Débit", desc: "Connexion ultra-rapide" },
              { icon: Car, name: "Parking Privé", desc: "Sécurisé 24h/24" },
              { icon: Coffee, name: "Restaurant", desc: "Cuisine gastronomique" },
              { icon: Waves, name: "Piscine & Spa", desc: "Détente absolue" },
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <service.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-hotel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "10,000+", label: "Clients Heureux" },
              { number: "250+", label: "Chambres Luxueuses" },
              { number: "50+", label: "Staff Professionnel" },
              { number: "4.9/5", label: "Note Moyenne" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold">{stat.number}</div>
                <div className="text-blue-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-blue-600 font-semibold">Contactez-nous</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Nous Sommes à Votre Service</h2>
              <p className="text-gray-600 mt-4">
                Notre équipe est disponible 24h/24 pour répondre à vos questions et vous aider 
                à planifier votre séjour parfait.
              </p>
              <div className="mt-8 space-y-6">
                {[
                  { icon: MapPin, label: "Boulevard Mohammed V, Casablanca" },
                  { icon: Phone, label: "+212 5 22 00 00 00" },
                  { icon: Mail, label: "contact@hotel-emsi.ma" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Envoyez-nous un message</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Nom" 
                    className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Sujet" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea 
                  placeholder="Votre message..." 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-8 w-8 text-blue-400" />
                <span className="font-bold text-xl">Hôtel EMSI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Le luxe et le confort au cœur de Casablanca. Une expérience inoubliable vous attend.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#chambres" className="hover:text-white transition-colors">Chambres</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Restaurant</li>
                <li>Piscine & Spa</li>
                <li>Salle de Gym</li>
                <li>Conciergerie</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Horaires</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Réception: 24h/24</li>
                <li>Restaurant: 7h - 23h</li>
                <li>Piscine: 6h - 22h</li>
                <li>Spa: 9h - 21h</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 Hôtel EMSI - Projet réalisé par Oussama SAJJI | EMSI Casablanca</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
