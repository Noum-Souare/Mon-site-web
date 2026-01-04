import React, { useState, useEffect } from 'react'
import './App.css'

// Composants réutilisables
const FeatureBlock = ({ color, gradient, icon, title, children, borderColor }) => (
  <div className={`feature-block feature-block--${color}`} style={{
    background: gradient,
    borderLeftColor: borderColor
  }}>
    <h5 style={{ color: borderColor }}>{icon} {title}</h5>
    {children}
  </div>
)

const StatCard = ({ value, label, color = 'var(--primary-blue)' }) => (
  <div className="stat-card">
    <div className="stat-value" style={{ color }}>{value}</div>
    <div className="stat-label">{label}</div>
  </div>
)

const ServiceCard = ({ icon, title, description }) => (
  <div className="service-card-grid">
    <div className="service-card-icon">{icon}</div>
    <div className="service-card-title">{title}</div>
    <div className="service-card-description">{description}</div>
  </div>
)

const StatsGrid = ({ title, stats }) => (
  <div className="stats-section">
    <h4 className="stats-title">{title}</h4>
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  </div>
)

// Constantes pour les thèmes de couleurs
const THEME_COLORS = {
  blue: {
    color: 'var(--primary-blue)',
    gradient: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)'
  },
  lightBlue: {
    color: '#4285f4',
    gradient: 'linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%)'
  },
  orange: {
    color: '#ff9800',
    gradient: 'linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%)'
  },
  green: {
    color: '#4caf50',
    gradient: 'linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%)'
  }
}

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [modalService, setModalService] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedFormation, setSelectedFormation] = useState(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    date: null,
    time: null,
    name: '',
    email: '',
    guestEmails: '',
    meetingType: 'google-meet',
    notes: ''
  })
  
  // États pour le bandeau de conception et les cookies
  const [showConstructionBanner, setShowConstructionBanner] = useState(true)
  const [showCookieSettings, setShowCookieSettings] = useState(false)
  const [showCookieModal, setShowCookieModal] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  })

  const serviceData = {
    'web-dev': {
      title: 'Développement Web, Desktop & Mobile',
      icon: '🌐',
      overview: `
        <div class="persuasive-intro">
          <p><strong>🌐 Créez les applications de demain dès aujourd'hui !</strong></p>
          <p>⚡ <em>Nos applications génèrent +250% d'engagement utilisateur en moyenne.</em> Transformez votre vision en solutions numériques qui captivent, convertissent et dominent leur marché. De l'idée au succès, nous maîtrisons chaque étape pour faire de votre projet le prochain phénomène digital !</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🎯 Notre expertise complète :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🌐 Applications Web Modernes</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>SPAs React/Vue.js/Angular haute performance</li>
            <li>PWAs avec fonctionnalités offline</li>
            <li>Applications temps réel WebSockets</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📱 Applications Mobiles</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>iOS natif (Swift/SwiftUI)</li>
            <li>Android natif (Kotlin/Jetpack Compose)</li>
            <li>Cross-platform (React Native, Flutter)</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">💻 Applications Desktop</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Electron pour applications cross-platform</li>
            <li>.NET MAUI pour Windows/macOS/Linux</li>
            <li>Qt et Tauri pour performance native</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">⚙️ Backend & Infrastructure</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>APIs REST/GraphQL avec Spring Boot, Node.js, Express.js</li>
            <li>Python (Django, FastAPI), PHP (Symfony)</li>
            <li>Microservices et architectures serverless</li>
            <li>Bases de données relationnelles (PostgreSQL, MySQL) et NoSQL (MongoDB, Redis)</li>
            <li>Cloud & DevOps (AWS, Azure, GCP)</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 2rem; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; border: 2px solid #9c27b0;">
          <h4 style="color: #9c27b0; font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">🚀 Quelques solutions que nous développons</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">💼</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">SaaS</div>
              <div style="font-size: 0.9rem; color: #666;">Plateformes logicielles en tant que service</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🛒</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">E-commerce</div>
              <div style="font-size: 0.9rem; color: #666;">Boutiques en ligne et marketplaces</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏥</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Santé digitale</div>
              <div style="font-size: 0.9rem; color: #666;">Applications médicales et télémédecine</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎓</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">EdTech</div>
              <div style="font-size: 0.9rem; color: #666;">Plateformes d'apprentissage en ligne</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏦</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">FinTech</div>
              <div style="font-size: 0.9rem; color: #666;">Solutions financières et paiements</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏭</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">IoT & Industrie 4.0</div>
              <div style="font-size: 0.9rem; color: #666;">Solutions connectées et automatisation</div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">📊 Résultats exceptionnels</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">10+</div>
              <div style="font-size: 0.9rem; color: #666;">Projets livrés avec succès</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">98%</div>
              <div style="font-size: 0.9rem; color: #666;">Satisfaction client (NPS 9.2/10)</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">95%</div>
              <div style="font-size: 0.9rem; color: #666;">Délais respectés (méthodologie agile)</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">90+</div>
              <div style="font-size: 0.9rem; color: #666;">Score Lighthouse moyen</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Analyse & Cadrage (1-2 semaines)', 
          desc: 'Audit technique existant, définition du périmètre fonctionnel, analyse des besoins utilisateurs, étude de faisabilité technique, benchmark concurrentiel et définition des KPIs de succès.'
        },
        { 
          title: 'Architecture & Conception (2-3 semaines)', 
          desc: 'Modélisation de la base de données, conception de l\'architecture microservices/monolithique, définition des APIs REST/GraphQL, choix de la stack technique optimale et planification des sprints de développement.'
        },
        { 
          title: 'Design System & UX/UI (2-4 semaines)', 
          desc: 'Création du design system, wireframing et prototypage interactif, tests utilisateurs, optimisation de l\'expérience mobile-first, validation de l\'accessibilité WCAG et finalisation des maquettes haute-fidélité.'
        },
        { 
          title: 'Développement MVP (4-8 semaines)', 
          desc: 'Développement du backend avec APIs sécurisées, intégration frontend responsive, implémentation des fonctionnalités core, tests unitaires et d\'intégration continus, code review systématique et documentation technique.'
        },
        { 
          title: 'Tests & Optimisation (2-3 semaines)', 
          desc: 'Tests fonctionnels automatisés (Cypress/Jest), tests de charge et performance (Lighthouse), audit de sécurité (OWASP), tests cross-browser/device, optimisation SEO technique et validation finale avec le client.'
        },
        { 
          title: 'Déploiement & Support (1-2 semaines puis continu)', 
          desc: 'Déploiement sur infrastructure cloud (AWS/Azure/GCP), mise en place du monitoring (Grafana/New Relic), formation des équipes client, documentation utilisateur complète et support technique 24/7 pendant 3 mois.'
        }
      ],
      blog: [
        { date: '15 Mai 2025', title: 'Les tendances du développement web en 2025', excerpt: 'Découvrez les technologies émergentes qui façonnent l\'avenir du web : WebAssembly, Web3, et l\'intégration native de l\'IA.' },
        { date: '10 Mai 2025', title: 'React vs Vue.js : Guide de choix pour 2025', excerpt: 'Comparatif détaillé des deux frameworks les plus populaires avec des exemples concrets et recommandations.' },
        { date: '5 Mai 2025', title: 'Optimisation des performances mobiles', excerpt: 'Techniques avancées pour créer des applications mobiles ultra-performantes avec React Native et Flutter.' }
      ]
    },
    'websites': {
      title: 'Sites Vitrines',
      icon: '🎨',
      overview: `
        <div class="persuasive-intro">
          <p><strong>🎯 Transformez votre présence web en machine à conversions !</strong></p>
          <p>⚡ <em>Nos sites vitrine génèrent en moyenne 340% de leads supplémentaires pour nos clients.</em> Créez une présence web professionnelle qui reflète parfaitement votre marque et convertit vos visiteurs en clients payants !</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🚀 Services haute performance :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🎨 Design Sur Mesure</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Création graphique unique qui vous démarque de 95% de vos concurrents</li>
            <li>Identité visuelle cohérente avec votre marque</li>
            <li>Expérience utilisateur optimisée pour la conversion</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔍 SEO & Performance</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Référencement naturel intégré dès la conception</li>
            <li>Temps de chargement < 2 secondes garantis</li>
            <li>Optimisation Core Web Vitals pour Google</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📱 Responsive & Mobile-First</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Design adaptatif pour tous les appareils</li>
            <li>Optimisation spéciale mobile (78% de votre trafic)</li>
            <li>Tests sur tous les navigateurs et résolutions</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">⚙️ CMS & Autonomie</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Interface d'administration intuitive</li>
            <li>Gestion autonome de votre contenu</li>
            <li>Formation incluse et support technique</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 2rem; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; border: 2px solid #9c27b0;">
          <h4 style="color: #9c27b0; font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">🎨 Types de sites vitrines que nous créons</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏢</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Corporate</div>
              <div style="font-size: 0.9rem; color: #666;">Sites d'entreprise professionnels</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎨</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Portfolio</div>
              <div style="font-size: 0.9rem; color: #666;">Mise en valeur créative</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏨</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Hôtellerie</div>
              <div style="font-size: 0.9rem; color: #666;">Réservation et présentation</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🍽️</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Restauration</div>
              <div style="font-size: 0.9rem; color: #666;">Menus et commandes en ligne</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏥</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Médical</div>
              <div style="font-size: 0.9rem; color: #666;">Prise de rendez-vous en ligne</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎓</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Éducation</div>
              <div style="font-size: 0.9rem; color: #666;">Établissements et formations</div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">💰 ROI démontré</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">+340%</div>
              <div style="font-size: 0.9rem; color: #666;">Leads générés en moyenne</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">-50%</div>
              <div style="font-size: 0.9rem; color: #666;">Coûts marketing (SEO intégré)</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">+89%</div>
              <div style="font-size: 0.9rem; color: #666;">Temps de visite (design optimisé)</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;"><2s</div>
              <div style="font-size: 0.9rem; color: #666;">Temps de chargement garanti</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Brief Stratégique & Analyse (3-5 jours)', 
          desc: 'Audit de l\'identité visuelle existante, analyse de la concurrence digitale, définition des objectifs business et conversion, persona mapping des visiteurs cibles et benchmark des best practices sectorielles.'
        },
        { 
          title: 'Architecture de l\'Information (1 semaine)', 
          desc: 'Structuration de l\'arborescence du site, définition du parcours utilisateur optimal, création de la stratégie de contenu SEO, planification des call-to-actions et optimisation du tunnel de conversion.'
        },
        { 
          title: 'Design & Prototypage (2-3 semaines)', 
          desc: 'Création de wireframes détaillés, conception du design system responsive, prototypage interactif avec micro-animations, tests A/B des variantes design et validation client avec itérations.'
        },
        { 
          title: 'Développement Frontend (2-4 semaines)', 
          desc: 'Intégration HTML5/CSS3 sémantique, développement responsive mobile-first, optimisation des performances (Core Web Vitals), intégration CMS headless et mise en place des analytics/tracking.'
        },
        { 
          title: 'Optimisation SEO & Performance (1-2 semaines)', 
          desc: 'Optimisation technique SEO (meta tags, schema markup), compression d\'images et lazy loading, configuration CDN et cache browser, audit Lighthouse et PageSpeed, tests de compatibilité navigateurs.'
        },
        { 
          title: 'Lancement & Formation (1 semaine)', 
          desc: 'Configuration domaine et certificat SSL, déploiement sur hébergement optimisé, formation à la gestion de contenu CMS, mise en place des outils de monitoring et support technique post-lancement.'
        }
      ],
      blog: [
        { date: '12 Mai 2025', title: 'Design web 2025 : les nouvelles tendances', excerpt: 'Explorez les tendances design qui marquent 2025 : glassmorphisme, micro-interactions et design inclusif.' },
        { date: '8 Mai 2025', title: 'SEO technique : guide complet 2025', excerpt: 'Maîtrisez les aspects techniques du référencement pour propulser votre site en première page.' },
        { date: '3 Mai 2025', title: 'Accessibilité web : bonnes pratiques', excerpt: 'Comment créer des sites web accessibles à tous et conformes aux standards WCAG 2.1.' }
      ]
    },
    'ai-data': {
      title: 'Intelligence Artificielle & Data Science',
      icon: '🤖',
      overview: `
        <div class="persuasive-intro">
          <p><strong>🤖 Révolutionnez votre business avec l'IA !</strong></p>
          <p>⚡ <em>L'IA génère +25% de revenus supplémentaires chez nos clients.</em> Ne restez pas spectateur de la révolution IA ! Exploitez la puissance de l'intelligence artificielle et transformez vos données en insights stratégiques pour propulser votre business vers le futur.</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🎯 Solutions IA révolutionnaires :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🧠 Machine Learning & IA Prédictive</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Modèles prédictifs qui anticipent vos besoins business avec 95% de précision</li>
            <li>Algorithmes d'optimisation pour la supply chain et pricing</li>
            <li>Détection d'anomalies et maintenance prédictive</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">💬 NLP & Computer Vision</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Chatbots intelligents qui augmentent la satisfaction client de 40%</li>
            <li>Analyse de sentiment et traitement du langage naturel</li>
            <li>Reconnaissance d'images ultra-performante pour l'automatisation</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📊 Data Science & Analytics</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Tableaux de bord temps réel pour des décisions éclairées</li>
            <li>Forecasting précis qui optimise vos stocks de 20%</li>
            <li>Traitement de téraoctets de données en temps record</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🤖 Automatisation Intelligente</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>RPA intelligent qui libère 30h/semaine de tâches répétitives</li>
            <li>Workflows d'automatisation avec prise de décision IA</li>
            <li>Intégration seamless avec vos systèmes existants</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 2rem; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; border: 2px solid #9c27b0;">
          <h4 style="color: #9c27b0; font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">🤖 Solutions IA que nous développons</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🧠</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Chatbots intelligents</div>
              <div style="font-size: 0.9rem; color: #666;">Assistants virtuels et support client IA</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">📈</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Analytics prédictifs</div>
              <div style="font-size: 0.9rem; color: #666;">Prévisions et optimisation métier</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">👁️</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Vision par ordinateur</div>
              <div style="font-size: 0.9rem; color: #666;">Reconnaissance et analyse d'images</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Détection d'anomalies</div>
              <div style="font-size: 0.9rem; color: #666;">Surveillance intelligente et alertes</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">📊</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Tableaux de bord IA</div>
              <div style="font-size: 0.9rem; color: #666;">Dashboards intelligents temps réel</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🤖</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Automatisation RPA</div>
              <div style="font-size: 0.9rem; color: #666;">Processus métier automatisés</div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">💰 ROI impressionnant</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">+25%</div>
              <div style="font-size: 0.9rem; color: #666;">Revenus supplémentaires après déploiement IA</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">-40%</div>
              <div style="font-size: 0.9rem; color: #666;">Coûts opérationnels (automatisation)</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">95%</div>
              <div style="font-size: 0.9rem; color: #666;">Précision des modèles prédictifs</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">300%</div>
              <div style="font-size: 0.9rem; color: #666;">ROI en 18 mois (études clients)</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Audit Data & Stratégie IA (2-3 semaines)', 
          desc: 'Cartographie complète des sources de données, évaluation de la qualité et volumétrie, identification des cas d\'usage IA à fort ROI, définition de la roadmap IA/ML et estimation des bénéfices métier quantifiés.'
        },
        { 
          title: 'Architecture Data & MLOps (2-4 semaines)', 
          desc: 'Conception du data lake/warehouse, mise en place des pipelines ETL/ELT, architecture MLOps avec CI/CD, sélection des technologies (TensorFlow, PyTorch, Spark) et définition des métriques de performance des modèles.'
        },
        { 
          title: 'Exploration & Préparation des Données (3-4 semaines)', 
          desc: 'Analyse exploratoire approfondie (EDA), nettoyage et enrichissement des datasets, feature engineering avancé, gestion des données manquantes/aberrantes et création des jeux de données d\'entraînement/validation/test.'
        },
        { 
          title: 'Développement & Entraînement des Modèles (4-6 semaines)', 
          desc: 'Sélection et comparaison d\'algorithmes ML/DL, hyperparameter tuning avec cross-validation, entraînement distribué si nécessaire, validation rigoureuse des performances et documentation technique complète des modèles.'
        },
        { 
          title: 'Validation & Tests Métier (2-3 semaines)', 
          desc: 'Tests A/B en environnement contrôlé, validation des prédictions avec experts métier, analyse de biais et équité des modèles, stress testing sur données réelles et optimisation des performances en production.'
        },
        { 
          title: 'Déploiement & Monitoring (2-3 semaines puis continu)', 
          desc: 'Déploiement via APIs REST/gRPC, mise en place du monitoring de drift des modèles, alerting automatique sur dégradation performances, re-entraînement automatisé et formation des équipes à l\'utilisation des insights IA.'
        }
      ],
      blog: [
        { date: '18 Mai 2025', title: 'IA générative en entreprise : guide pratique', excerpt: 'Comment intégrer efficacement l\'IA générative dans vos processus métier avec des exemples concrets.' },
        { date: '14 Mai 2025', title: 'Machine Learning explicable (XAI)', excerpt: 'Comprendre et expliquer les décisions de vos modèles IA pour une adoption en confiance.' },
        { date: '9 Mai 2025', title: 'Éthique et IA : enjeux et bonnes pratiques', excerpt: 'Les considérations éthiques essentielles pour un déploiement responsable de l\'IA.' }
      ]
    },
    'cybersecurity': {
      title: 'Cybersécurité',
      icon: '🔒',
      overview: `
        <div class="persuasive-intro">
          <p><strong>🛡️ Sécurisez votre avenir numérique !</strong></p>
          <p>⚡ <em>Une cyberattaque coûte en moyenne 4.45M$ à une entreprise.</em> Ne laissez pas les hackers détruire des années de travail ! Protégez votre entreprise avec nos solutions de cybersécurité militaire et dormez enfin sur vos deux oreilles.</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🔐 Protection niveau militaire :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔍 Audit & Tests d'Intrusion</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Évaluation par d'anciens experts NSA qui découvrent 99.7% des failles</li>
            <li>Tests d'intrusion par des hackers éthiques certifiés OSCP</li>
            <li>Audit de conformité, ISO 27001 garantie</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🚨 Monitoring & SOC 24/7</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Centre opérationnel 24/7 qui bloque 50,000 attaques/jour</li>
            <li>SIEM dernière génération avec intelligence artificielle</li>
            <li>Formation de vos équipes en remparts humains anti-phishing</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🎓 Formation & Sensibilisation</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Transformation de vos équipes en remparts humains anti-phishing</li>
            <li>Programmes de sensibilisation cybersécurité</li>
            <li>Simulations d'attaques et exercices pratiques</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🛡️ Architecture Zero Trust</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Firewall Zero Trust et segmentation réseau</li>
            <li>Sauvegardes ultra-sécurisées et disaster recovery</li>
            <li>Solutions IAM, PAM et gestion des identités</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff0f8 0%, #ffe0f0 100%); border-radius: 12px; border-left: 4px solid #e91e63;">
          <h5 style="color: #e91e63; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">⚖️ Gestion du Risque SI</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Analyse des risques liés aux SI avec méthodologie EBIOS RM et ISO 27005</li>
            <li>Élaboration d'une politique de sécurité SI (PSSI) sur mesure et adaptée à votre contexte</li>
            <li>Mise en place d'un Plan de Continuité d'Activité (PCA) et Plan de Reprise d'Activité (PRA)</li>
            <li>Maîtrise des risques juridiques liés au numérique et conformité réglementaire</li>
            <li>Cartographie des actifs critiques et évaluation des menaces cybersécurité</li>
            <li>Matrice de risques avec priorisation selon l'impact business</li>
            <li>Gouvernance des risques SI et pilotage des indicateurs de sécurité</li>
            <li>Formation et sensibilisation des équipes à la gestion des risques</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f4ff 0%, #e0e8ff 100%); border-radius: 12px; border-left: 4px solid #667eea;">
          <h5 style="color: #667eea; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🏢 Sécurisation de l'Infrastructure SI</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Audit complet de l'infrastructure réseau et serveurs</li>
            <li>Mise en place de firewalls nouvelle génération (NGFW)</li>
            <li>Segmentation réseau et micro-segmentation avancée</li>
            <li>Durcissement des systèmes (Windows, Linux, VMware)</li>
            <li>Déploiement de solutions EDR/XDR pour la détection avancée</li>
            <li>Configuration sécurisée des équipements actifs (switches, routeurs)</li>
            <li>Mise en place de VPN sécurisés et accès à distance</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff4 0%, #e0ffe8 100%); border-radius: 12px; border-left: 4px solid #48bb78;">
          <h5 style="color: #48bb78; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🛡️ Sécurisation des Applications SI</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Audit de sécurité applicative (SAST/DAST/IAST)</li>
            <li>Tests d'intrusion spécialisés sur applications web et mobiles</li>
            <li>Analyse du code source et revue de sécurité</li>
            <li>Implémentation de WAF (Web Application Firewall)</li>
            <li>Sécurisation des API REST/GraphQL et microservices</li>
            <li>Chiffrement des données en transit et au repos</li>
            <li>Mise en place de l'authentification forte (MFA/2FA)</li>
            <li>Protection contre OWASP Top 10 et vulnérabilités émergentes</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffedd5 100%); border-radius: 12px; border-left: 4px solid #fb923c;">
          <h5 style="color: #fb923c; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔍 Investigation d'Incidents de Sécurité</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Forensic numérique et analyse post-incident</li>
            <li>Collecte et préservation des preuves numériques</li>
            <li>Analyse des logs et corrélation d'événements</li>
            <li>Identification des vecteurs d'attaque et IOC (Indicators of Compromise)</li>
            <li>Reconstruction de la chronologie des incidents</li>
            <li>Analyse de malwares et reverse engineering</li>
            <li>Rapport d'expertise judiciaire et support légal</li>
            <li>Recommandations de remédiation et amélioration continue</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 2rem; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; border: 2px solid #9c27b0;">
          <h4 style="color: #9c27b0; font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">🛡️ Solutions cybersécurité que nous déployons</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Audit sécurité</div>
              <div style="font-size: 0.9rem; color: #666;">Tests d'intrusion et évaluation</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🚨</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">SOC 24/7</div>
              <div style="font-size: 0.9rem; color: #666;">Centre opérationnel sécurité</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔥</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Firewall Zero Trust</div>
              <div style="font-size: 0.9rem; color: #666;">Architecture sécurisée avancée</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎓</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Formation équipes</div>
              <div style="font-size: 0.9rem; color: #666;">Sensibilisation cybersécurité</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔐</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Gestion identités</div>
              <div style="font-size: 0.9rem; color: #666;">IAM et contrôle d'accès</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">💾</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Plan de continuité</div>
              <div style="font-size: 0.9rem; color: #666;">Sauvegarde et disaster recovery</div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">💰 Économies garanties</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">-95%</div>
              <div style="font-size: 0.9rem; color: #666;">Risques de cyberattaques réussies</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">0€</div>
              <div style="font-size: 0.9rem; color: #666;">Rançon grâce aux sauvegardes sécurisées</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">250%</div>
              <div style="font-size: 0.9rem; color: #666;">ROI en évitant une cyberattaque majeure</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">99.7%</div>
              <div style="font-size: 0.9rem; color: #666;">Failles détectées par nos experts</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Audit de Sécurité Global & Cartographie des Risques (2-3 semaines)', 
          desc: 'Cartographie complète de l\'infrastructure IT, inventaire des actifs critiques, évaluation des vulnérabilités techniques (scan automatisé + manuel), audit des configurations et des politiques de sécurité existantes, compliance check (ISO 27001, SOC2), analyse des risques méthodologie EBIOS RM.'
        },
        { 
          title: 'Sécurisation Infrastructure SI & Durcissement (3-4 semaines)', 
          desc: 'Audit complet infrastructure réseau et serveurs, déploiement firewalls NGFW et segmentation réseau avancée, durcissement systèmes (Windows, Linux, VMware), configuration VPN sécurisés, déploiement solutions EDR/XDR, sécurisation équipements actifs (switches, routeurs).'
        },
        { 
          title: 'Sécurisation Applications SI & Tests Intrusion (3-4 semaines)', 
          desc: 'Audit sécurité applicative (SAST/DAST/IAST), tests d\'intrusion spécialisés applications web/mobiles, analyse code source et revue sécurité, implémentation WAF, sécurisation APIs REST/GraphQL, chiffrement données transit/repos, authentification forte (MFA/2FA).'
        },
        { 
          title: 'Architecture Zero Trust & Gouvernance (2-3 semaines)', 
          desc: 'Définition de l\'architecture de sécurité Zero Trust, sélection des solutions techniques (SIEM, EDR, PAM), planification de la segmentation réseau et micro-segmentation, conception des politiques de sécurité (PSSI), définition processus incident response et gouvernance SI.'
        },
        { 
          title: 'Déploiement SOC 24/7 & Monitoring Avancé (2-3 semaines)', 
          desc: 'Mise en place centre opérationnel sécurité 24/7, déploiement SIEM dernière génération avec IA, configuration monitoring et alerting proactif, mise en place threat hunting, intégration solutions IAM/PAM, configuration sauvegarde ultra-sécurisée et disaster recovery.'
        },
        { 
          title: 'Investigation Forensique & Formation Équipes (2-3 semaines)', 
          desc: 'Mise en place capacités forensic numérique et analyse post-incident, formation équipes cybersécurité et sensibilisation anti-phishing, simulations d\'attaques et exercices pratiques, documentation procédures incident response, tests de résilience et récupération.'
        },
        { 
          title: 'Plan Continuité Activité & Amélioration Continue (Continu)', 
          desc: 'Élaboration Plans de Continuité (PCA) et Reprise d\'Activité (PRA), surveillance 24/7 via SOC, threat hunting proactif, mise à jour signatures et règles détection, audits sécurité trimestriels, formation continue équipes, optimisation processus et gouvernance risques SI.'
        }
      ],
      blog: [
        { date: '20 Mai 2025', title: 'Zero Trust : révolution de la sécurité IT', excerpt: 'Découvrez comment l\'approche Zero Trust transforme la cybersécurité d\'entreprise.' },
        { date: '16 Mai 2025', title: 'Ransomware : prévention et réponse', excerpt: 'Guide complet pour se protéger contre les ransomwares et réagir en cas d\'attaque.' },
        { date: '11 Mai 2025', title: 'Protection des données en 2025 : nouveautés et sanctions', excerpt: 'Mise à jour des exigences et bonnes pratiques pour rester conforme.' }
      ]
    },
    'blockchain': {
      title: 'Blockchain',
      icon: '⛓️',
      overview: `
        <div class="persuasive-intro">
          <p><strong>⛓️ Révolutionnez votre business avec la Blockchain !</strong></p>
          <p>⚡ <em>La blockchain va générer 3.1 trillions$ de valeur d'ici 2030.</em> Ne ratez pas la révolution Web3 ! Créez des solutions décentralisées innovantes qui positionnent votre entreprise à l'avant-garde technologique et ouvrent de nouveaux modèles économiques.</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🚀 Solutions Web3 révolutionnaires :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔗 Applications Décentralisées (DApps)</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Applications décentralisées qui éliminent les intermédiaires (-50% de coûts de transaction)</li>
            <li>Smart Contracts auto-exécutables 100% transparents</li>
            <li>Gouvernance décentralisée et voting on-chain</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">💎 NFT & Tokenisation</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Plateformes de certification numérique qui créent de nouveaux revenus</li>
            <li>Tokenisation d'actifs physiques et numériques</li>
            <li>Marketplaces NFT sur-mesure</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">💰 DeFi & Finance Décentralisée</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Solutions financières décentralisées avec rendements jusqu'à 20% APY</li>
            <li>Protocoles de lending et staking</li>
            <li>Échanges décentralisés (DEX)</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📦 Traçabilité & Supply Chain</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Supply chain immuable qui élimine la contrefaçon</li>
            <li>Traçabilité de bout en bout</li>
            <li>Certification d'authenticité blockchain</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 2rem; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; border: 2px solid #9c27b0;">
          <h4 style="color: #9c27b0; font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">⛓️ Solutions blockchain que nous développons</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏪</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Marketplaces NFT</div>
              <div style="font-size: 0.9rem; color: #666;">Plateformes de trading et certification</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏦</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Protocoles DeFi</div>
              <div style="font-size: 0.9rem; color: #666;">Lending, staking et échanges décentralisés</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">📦</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Supply Chain</div>
              <div style="font-size: 0.9rem; color: #666;">Traçabilité et anti-contrefaçon</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🗳️</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Gouvernance DAO</div>
              <div style="font-size: 0.9rem; color: #666;">Organisations décentralisées autonomes</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">💎</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Tokenisation</div>
              <div style="font-size: 0.9rem; color: #666;">Actifs numériques et physiques</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔐</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Identité digitale</div>
              <div style="font-size: 0.9rem; color: #666;">KYC/AML et vérification décentralisée</div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">💎 Avantages concurrentiels</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">-50%</div>
              <div style="font-size: 0.9rem; color: #666;">Réduction des coûts de transaction</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">3.1T$</div>
              <div style="font-size: 0.9rem; color: #666;">Valeur blockchain prévue d'ici 2030</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">20%</div>
              <div style="font-size: 0.9rem; color: #666;">Rendements DeFi possibles (APY)</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">100%</div>
              <div style="font-size: 0.9rem; color: #666;">Transparence des smart contracts</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Analyse de Faisabilité Blockchain (1-2 semaines)', 
          desc: 'Évaluation de la pertinence blockchain pour votre cas d\'usage, analyse coût/bénéfice vs solutions traditionnelles, sélection de la blockchain optimale (publique/privée/consortium), étude de la tokenomics si applicable et validation de la viabilité technique et économique.'
        },
        { 
          title: 'Architecture Décentralisée (2-3 semaines)', 
          desc: 'Conception de l\'architecture on-chain/off-chain, modélisation des smart contracts et interactions, définition des mécanismes de consensus et gouvernance, planification de l\'interopérabilité multi-chaînes et conception des bridges si nécessaires.'
        },
        { 
          title: 'Développement Smart Contracts (3-5 semaines)', 
          desc: 'Développement en Solidity/Rust selon la blockchain, implémentation des standards (ERC-20, ERC-721, ERC-1155), optimisation du gas et des performances, tests unitaires exhaustifs avec frameworks dédiés (Hardhat, Foundry) et documentation technique complète.'
        },
        { 
          title: 'Interface DApp & Intégration Web3 (3-4 semaines)', 
          desc: 'Développement de l\'interface utilisateur Web3, intégration avec wallets (MetaMask, WalletConnect), implémentation des interactions blockchain (lecture/écriture), gestion des états de transaction et UX optimisée pour l\'écosystème décentralisé.'
        },
        { 
          title: 'Audit de Sécurité & Tests (2-3 semaines)', 
          desc: 'Audit de sécurité des smart contracts par experts tiers, tests de pénétration spécifiques blockchain, validation des mécanismes économiques, tests de stress sur testnets publics et correction des vulnérabilités identifiées.'
        },
        { 
          title: 'Déploiement Mainnet & Gouvernance (1-2 semaines puis continu)', 
          desc: 'Déploiement progressif sur mainnet avec monitoring, mise en place de la gouvernance décentralisée, configuration des oracles si nécessaires, formation des utilisateurs aux wallets et interfaces Web3, support technique spécialisé blockchain.'
        }
      ],
      blog: [
        { date: '22 Mai 2025', title: 'Web3 et entreprises : cas d\'usage concrets', excerpt: 'Comment les entreprises utilisent la blockchain pour transformer leurs activités.' },
        { date: '17 Mai 2025', title: 'Sécurité des Smart Contracts', excerpt: 'Bonnes pratiques pour développer des contrats intelligents sécurisés.' },
        { date: '13 Mai 2025', title: 'NFT B2B : au-delà de l\'art numérique', excerpt: 'Applications professionnelles des NFT : certification, authentification, propriété.' }
      ]
    },
    'conformite-donnees': {
      title: 'Gouvernance des données & Accompagnement dans la conformité',
      icon: '🛡️',
      overview: `
        <div class="persuasive-intro">
          <p><strong>🛡️ Protégez vos données et assurez votre conformité légale !</strong></p>
          <p>⚡ <em>La conformité et protection des données devient obligatoire en Guinée.</em> Avec la future Autorité de Protection des Données à Caractère Personnel (APDP), anticipez les nouvelles réglementations et protégez votre entreprise des sanctions. Notre expertise vous accompagne dans cette transition réglementaire cruciale !</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🔒 Cadre légal guinéen :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📋 Loi N° L/2016/037/AN</h5>
          <p style="line-height: 1.8; margin-bottom: 1rem;">La loi relative à la cybersécurité et à la protection des données à caractère personnel en République de Guinée établit le cadre légal pour la protection des données personnelles.</p>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li><strong>Article 14 :</strong> Obligation de désigner un correspondant à la protection des données (DPO)</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-radius: 12px; border-left: 4px solid #2e7d32;">
          <h5 style="color: #2e7d32; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📊 Gouvernance des données</h5>
          <p style="line-height: 1.8; margin-bottom: 1rem;">Mise en place d'un cadre de gouvernance complet pour maîtriser, sécuriser et valoriser vos données tout au long de leur cycle de vie, en conformité avec les exigences réglementaires.</p>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Définition des politiques et procédures de gestion des données</li>
            <li>Cartographie complète et inventaire des données de l'organisation</li>
            <li>Classification et catégorisation des données selon leur sensibilité</li>
            <li>Mise en place d'un catalogue de données et gestion des métadonnées</li>
            <li>Définition des rôles et responsabilités (Data Owner, Data Steward, etc.)</li>
            <li>Traçabilité et linéage des données (data lineage)</li>
            <li>Qualité des données : définition de règles, monitoring et correction</li>
            <li>Gestion du cycle de vie des données (création, utilisation, archivage, suppression)</li>
            <li>Conformité réglementaire et respect des obligations légales</li>
            <li>Mise en place d'indicateurs de performance (KPI) pour la gouvernance</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🏛️ Autorité de Protection des Données (APDP)</h5>
          <p style="line-height: 1.8; margin-bottom: 1rem;">La future APDP sera l'autorité de contrôle chargée de garantir la mise en œuvre effective des dispositions légales en matière de protection des données.</p>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Contrôle et vérification de la conformité des traitements</li>
            <li>Sanctions en cas de non-conformité</li>
            <li>Accompagnement des organisations dans leur mise en conformité</li>
          </ul>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🎯 Nos services d'accompagnement :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">👨‍💼 Assistance DPO</h5>
          <p style="line-height: 1.8; margin-bottom: 1rem;">Soutien complet aux Délégués à la Protection des Données dans l'exercice de leurs missions conformément à l'article 14 de la loi guinéenne.</p>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Conseil juridique et technique spécialisé</li>
            <li>Veille réglementaire et mise à jour des obligations</li>
            <li>Gestion des relations avec l'APDP</li>
            <li>Tenue et mise à jour du registre des traitements</li>
            <li>Accompagnement dans les procédures de notification</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔍 Audit de conformité</h5>
          <p style="line-height: 1.8; margin-bottom: 1rem;">Évaluation complète du niveau de conformité de votre organisation aux exigences de la loi guinéenne sur la protection des données.</p>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Analyse des processus de collecte et traitement des données</li>
            <li>Vérification de la conformité des systèmes d'information</li>
            <li>Évaluation des mesures de sécurité techniques et organisationnelles</li>
            <li>Rapport détaillé avec plan d'actions correctives</li>
            <li>Préparation aux contrôles de l'APDP</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🏗️ Gouvernance SSI</h5>
          <p style="line-height: 1.8; margin-bottom: 1rem;">Mise en place d'une gouvernance efficace de la Sécurité des Systèmes d'Information alignée avec les exigences légales guinéennes.</p>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Élaboration de politiques de sécurité des données</li>
            <li>Gestion des risques et classification des données</li>
            <li>Mise en œuvre de mesures techniques de protection</li>
            <li>Procédures de gestion des incidents de sécurité</li>
            <li>Contrôles d'accès et traçabilité des actions</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🤝 DPO externalisé</h5>
          <p style="line-height: 1.8; margin-bottom: 1rem;">Service de DPO externalisé pour les organisations ne disposant pas de ressources internes dédiées, assurant la conformité continue.</p>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Désignation d'un DPO qualifié selon l'article 14</li>
            <li>Assistance permanente dans les obligations légales</li>
            <li>Interface privilégiée avec l'APDP</li>
            <li>Mise à jour continue du registre des traitements</li>
            <li>Formation des équipes internes</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px; border-left: 4px solid #9c27b0;">
          <h5 style="color: #9c27b0; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🎓 Formation DPO</h5>
          <p style="line-height: 1.8; margin-bottom: 1rem;">Formations spécialisées pour les DPO et professionnels impliqués dans la protection des données personnelles.</p>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Formation aux aspects juridiques de la loi guinéenne</li>
            <li>Acquisition des compétences techniques nécessaires</li>
            <li>Gestion des relations avec les autorités de contrôle</li>
            <li>Certification et validation des acquis</li>
            <li>Formation continue et mise à jour réglementaire</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%); border-radius: 12px; border-left: 4px solid #f44336;">
          <h5 style="color: #f44336; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📢 Sensibilisation</h5>
          <p style="line-height: 1.8; margin-bottom: 1rem;">Sessions de sensibilisation pour promouvoir une culture de protection des données personnelles au sein de votre organisation.</p>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Sensibilisation du personnel aux enjeux de protection des données</li>
            <li>Formation aux bonnes pratiques et obligations légales</li>
            <li>Simulation d'incidents et procédures d'urgence</li>
            <li>Création d'une charte de protection des données</li>
            <li>Évaluation et suivi des comportements</li>
          </ul>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">🛡️ Avantages de la conformité</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">100%</div>
              <div style="font-size: 0.9rem; color: #666;">Conformité aux exigences légales guinéennes</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">-90%</div>
              <div style="font-size: 0.9rem; color: #666;">Réduction des risques de sanctions</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">+75%</div>
              <div style="font-size: 0.9rem; color: #666;">Confiance des clients et partenaires</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">24/7</div>
              <div style="font-size: 0.9rem; color: #666;">Support et veille réglementaire</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Audit initial & Cartographie des données (2-3 semaines)', 
          desc: 'Inventaire complet des traitements de données personnelles, cartographie des flux de données, évaluation du niveau de conformité actuel, identification des risques et non-conformités, analyse des obligations légales spécifiques à votre secteur d\'activité selon la loi guinéenne.'
        },
        { 
          title: 'Désignation DPO & Mise en conformité (3-4 semaines)', 
          desc: 'Désignation du DPO interne ou externalisé selon l\'article 14 de la loi, création du registre des traitements, mise en place des procédures de consentement et d\'information des personnes, élaboration des politiques de protection des données et des procédures de gestion des droits des personnes.'
        },
        { 
          title: 'Sécurisation technique & Gouvernance SSI (4-5 semaines)', 
          desc: 'Mise en œuvre des mesures techniques de sécurité (chiffrement, contrôle d\'accès, traçabilité), durcissement des systèmes d\'information, mise en place de la gouvernance SSI, procédures de gestion des incidents de sécurité et plan de continuité d\'activité en cas de violation de données.'
        },
        { 
          title: 'Formation & Sensibilisation (2-3 semaines)', 
          desc: 'Formation complète du DPO et des équipes techniques, sensibilisation de l\'ensemble du personnel aux enjeux de protection des données, création de supports de formation et de communication, simulation d\'incidents et tests des procédures d\'urgence, évaluation des acquis et certification.'
        },
        { 
          title: 'Tests & Validation (2-3 semaines)', 
          desc: 'Tests de conformité complets, audit interne par un expert externe, simulation de contrôles de l\'APDP, validation des procédures et documentation, tests de résistance aux violations de données, optimisation des processus et correction des non-conformités identifiées.'
        },
        { 
          title: 'Déploiement & Suivi continu (1-2 semaines puis continu)', 
          desc: 'Mise en production des mesures de conformité, formation des utilisateurs finaux, mise en place du monitoring et de la veille réglementaire, accompagnement dans les relations avec l\'APDP, audits de conformité périodiques et mise à jour continue des procédures selon l\'évolution réglementaire.'
        }
      ],
      blog: [
        { date: '25 Mai 2025', title: 'APDP en Guinée : préparer votre organisation', excerpt: 'Comment anticiper la mise en place de l\'Autorité de Protection des Données et assurer votre conformité.' },
        { date: '21 Mai 2025', title: 'Loi guinéenne sur les données : obligations des entreprises', excerpt: 'Décryptage des obligations légales pour les organisations en Guinée selon la loi L/2016/037/AN.' },
        { date: '19 Mai 2025', title: 'DPO en Guinée : rôle et responsabilités', excerpt: 'Guide complet sur le rôle du Délégué à la Protection des Données selon la législation guinéenne.' }
      ]
    },
    'cloud-devops': {
      title: 'Cloud & DevOps',
      icon: '☁️',
      overview: `
        <div class="persuasive-intro">
          <p><strong>☁️ Propulsez votre business dans le cloud !</strong></p>
          <p>⚡ <em>Les entreprises cloud-natives croissent 2.5x plus vite que leurs concurrents.</em> Rejoignez les géants technologiques ! Accélérez votre transformation digitale avec nos solutions cloud et DevOps ultra-performantes qui garantissent scalabilité infinie et coûts optimisés.</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🚀 Services Cloud révolutionnaires :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">☁️ Migration & Architecture Cloud</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Transition fluide vers AWS/Azure/GCP avec 99.99% d'uptime garanti</li>
            <li>Architecture microservices et serverless</li>
            <li>Stratégies multi-cloud anti-vendor lock</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🛠️ Infrastructure as Code</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Automatisation Terraform qui réduit les erreurs de 95%</li>
            <li>Provisioning automatisé et reproductible</li>
            <li>Gestion de configuration centralisée</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🐳 Containerisation & Orchestration</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Docker/Kubernetes pour scalabilité instantanée jusqu'à 10,000 utilisateurs</li>
            <li>Déploiements 50x plus rapides avec pipelines CI/CD</li>
            <li>Auto-scaling et load balancing intelligents</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📊 Monitoring & DevSecOps</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Prometheus/Grafana qui préviennent 99% des pannes</li>
            <li>Sécurité intégrée dès le code (0 vulnérabilité en production)</li>
            <li>Observabilité complète et alerting intelligent</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 2rem; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; border: 2px solid #9c27b0;">
          <h4 style="color: #9c27b0; font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">☁️ Solutions cloud que nous déployons</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🚀</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Migration cloud</div>
              <div style="font-size: 0.9rem; color: #666;">AWS, Azure, GCP avec stratégie multi-cloud</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏗️</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Infrastructure as Code</div>
              <div style="font-size: 0.9rem; color: #666;">Terraform, Ansible et automatisation</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🐳</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Containerisation</div>
              <div style="font-size: 0.9rem; color: #666;">Docker, Kubernetes et orchestration</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔄</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">CI/CD Pipelines</div>
              <div style="font-size: 0.9rem; color: #666;">Déploiements automatisés et sécurisés</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">📊</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Monitoring avancé</div>
              <div style="font-size: 0.9rem; color: #666;">Prometheus, Grafana et observabilité</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">💰</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">FinOps</div>
              <div style="font-size: 0.9rem; color: #666;">Optimisation des coûts cloud</div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">💰 ROI immédiat</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">-60%</div>
              <div style="font-size: 0.9rem; color: #666;">Coûts infrastructure après migration cloud</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">×10</div>
              <div style="font-size: 0.9rem; color: #666;">Accélération time-to-market (DevOps)</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">99.99%</div>
              <div style="font-size: 0.9rem; color: #666;">Disponibilité garantie</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">-95%</div>
              <div style="font-size: 0.9rem; color: #666;">Réduction des erreurs (IaC)</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Assessment & Stratégie Cloud (2-3 semaines)', 
          desc: 'Audit complet de l\'infrastructure existante (serveurs, applications, données), évaluation des coûts actuels vs cloud, analyse des dépendances et contraintes techniques, définition de la stratégie multi-cloud/hybride et roadmap de migration priorisée par criticité business.'
        },
        { 
          title: 'Architecture Cloud-Native (2-4 semaines)', 
          desc: 'Conception de l\'architecture microservices/serverless, définition des VPC et segmentation réseau, planification de la haute disponibilité et disaster recovery, sélection des services managés optimaux, design des patterns de sécurité et compliance cloud.'
        },
        { 
          title: 'Infrastructure as Code & Automatisation (3-4 semaines)', 
          desc: 'Développement des templates Terraform/CloudFormation, mise en place des pipelines CI/CD (GitLab/GitHub Actions), automatisation des déploiements avec blue/green ou canary, configuration du monitoring et alerting (Prometheus/Grafana), implémentation des politiques de backup automatisées.'
        },
        { 
          title: 'Migration & Containerisation (4-8 semaines)', 
          desc: 'Migration des applications selon stratégie 6R (Rehost/Refactor/Rebuild), containerisation avec Docker et orchestration Kubernetes, migration des bases de données avec minimal downtime, tests de charge et validation des performances, migration des données avec synchronisation.'
        },
        { 
          title: 'DevSecOps & Optimisation (2-3 semaines)', 
          desc: 'Intégration de la sécurité dans les pipelines (SAST/DAST), mise en place de la gestion des secrets (Vault/AWS Secrets), configuration du scanning de vulnérabilités automatisé, optimisation des coûts cloud (right-sizing, reserved instances), tuning des performances applicatives.'
        },
        { 
          title: 'Gouvernance & FinOps (1-2 semaines puis continu)', 
          desc: 'Mise en place de la gouvernance cloud (policies, budgets, tagging), formation des équipes aux bonnes pratiques DevOps, établissement des SLA et métriques de performance, monitoring continu des coûts avec optimisation automatisée, support et amélioration continue.'
        }
      ],
      blog: [
        { date: '25 Mai 2025', title: 'FinOps : optimiser les coûts cloud', excerpt: 'Stratégies pour maîtriser et optimiser vos dépenses cloud avec les bonnes pratiques FinOps.' },
        { date: '21 Mai 2025', title: 'Kubernetes en production : guide complet', excerpt: 'Déployer et gérer Kubernetes en production avec sécurité et performance.' },
        { date: '19 Mai 2025', title: 'GitOps : révolution du déploiement', excerpt: 'Comment GitOps transforme la façon de déployer et gérer les applications.' }
      ]
    },
    'exploitation-maintenance': {
      title: 'Exploitation et Maintenance',
      icon: '🔧',
      overview: `
        <div class="persuasive-intro">
          <p><strong>🔧 Zéro panne, performance maximale !</strong></p>
          <p>⚡ <em>Nos clients évitent 99.7% des pannes grâce à notre maintenance préventive.</em> Plus jamais de stress lié aux plantages système ! Nos experts veillent 24/7 sur vos infrastructures pour garantir une disponibilité parfaite et des performances optimales qui boostent votre productivité.</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🛠️ Services d'exploitation niveau entreprise :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📊 Monitoring & Surveillance 24/7</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Surveillance continue de vos infrastructures critiques</li>
            <li>Alertes proactives avant les incidents</li>
            <li>Tableaux de bord temps réel des performances</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔧 Maintenance Préventive</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Interventions planifiées pour éviter les pannes</li>
            <li>Mises à jour et patches de sécurité automatisés</li>
            <li>Optimisation continue des performances système</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🆘 Support & Assistance</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Assistance réactive en cas d'incident critique</li>
            <li>Support technique multicanal (téléphone, email, ticket)</li>
            <li>Escalade automatique selon les SLA définis</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">💾 Sauvegarde & Recovery</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Stratégies de backup automatisées et sécurisées</li>
            <li>Tests réguliers de restauration des données</li>
            <li>Plan de reprise d'activité (PRA) personnalisé</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 2rem; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; border: 2px solid #9c27b0;">
          <h4 style="color: #9c27b0; font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">🔧 Services d'exploitation que nous fournissons</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">📊</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Monitoring 24/7</div>
              <div style="font-size: 0.9rem; color: #666;">Surveillance continue et alertes proactives</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔧</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Maintenance préventive</div>
              <div style="font-size: 0.9rem; color: #666;">Interventions planifiées et patches</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🆘</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Support réactif</div>
              <div style="font-size: 0.9rem; color: #666;">Assistance technique multicanal</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">💾</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Sauvegarde & Recovery</div>
              <div style="font-size: 0.9rem; color: #666;">Plans de reprise d'activité</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">⚡</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Optimisation</div>
              <div style="font-size: 0.9rem; color: #666;">Amélioration continue des performances</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">📋</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Gestion des incidents</div>
              <div style="font-size: 0.9rem; color: #666;">Résolution rapide et documentation</div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">🎯 Performance garantie</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">99.7%</div>
              <div style="font-size: 0.9rem; color: #666;">Pannes évitées (maintenance préventive)</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">24/7</div>
              <div style="font-size: 0.9rem; color: #666;">Surveillance continue des systèmes</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">99.99%</div>
              <div style="font-size: 0.9rem; color: #666;">Disponibilité des services garantie</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">< 2h</div>
              <div style="font-size: 0.9rem; color: #666;">Temps de réponse en cas d'incident</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Audit Infrastructure Existante (1-2 semaines)', 
          desc: 'Inventaire complet des équipements et logiciels, évaluation de l\'état de santé des systèmes, identification des risques et vulnérabilités, analyse des performances actuelles et documentation de l\'architecture existante.'
        },
        { 
          title: 'Mise en Place du Monitoring (1-2 semaines)', 
          desc: 'Installation des outils de surveillance (Nagios, Zabbix, PRTG), configuration des alertes et seuils personnalisés, mise en place des tableaux de bord temps réel, intégration avec les systèmes existants et formation des équipes.'
        },
        { 
          title: 'Plan de Maintenance Préventive (1 semaine)', 
          desc: 'Définition du calendrier des interventions planifiées, création des procédures de maintenance standardisées, planification des mises à jour et patches de sécurité, organisation des fenêtres de maintenance et validation avec les équipes métier.'
        },
        { 
          title: 'Mise en Production du Support (1 semaine)', 
          desc: 'Activation du support technique multicanal (téléphone, email, ticket), mise en place des astreintes et escalades, configuration des outils de ticketing, définition des SLA par criticité et formation du support utilisateur.'
        },
        { 
          title: 'Optimisation Continue (Continu)', 
          desc: 'Analyse régulière des performances et logs, identification des goulots d\'étranglement, optimisation des configurations, mise à jour technologique progressive, reporting mensuel des KPI et recommandations d\'amélioration.'
        }
      ],
      blog: [
        { date: '26 Mai 2025', title: 'ITIL v4 : révolution de la gestion des services IT', excerpt: 'Découvrez comment ITIL v4 transforme l\'approche de l\'exploitation et de la maintenance IT.' },
        { date: '23 Mai 2025', title: 'Monitoring proactif : prévenir plutôt que guérir', excerpt: 'Les bonnes pratiques pour mettre en place un monitoring efficace de votre infrastructure.' },
        { date: '21 Mai 2025', title: 'Maintenance prédictive avec l\'IA', excerpt: 'Comment l\'intelligence artificielle révolutionne la maintenance des systèmes informatiques.' }
      ]
    },
    'modelisation-decisionnelle': {
      title: 'Modélisation Décisionnelle',
      icon: '📊',
      overview: `
        <div class="persuasive-intro">
          <p><strong>📊 Transformez vos données en or numérique !</strong></p>
          <p>⚡ <em>Nos solutions BI augmentent la productivité décisionnelle de 45% en moyenne.</em> Fini les décisions à l'aveugle ! Exploitez la puissance de vos données avec nos tableaux de bord intelligents qui révèlent les insights cachés et accélèrent vos prises de décision stratégiques.</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🎯 Solutions décisionnelles révolutionnaires :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🏗️ Data Warehouse & Architecture</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Entrepôts de données centralisés et optimisés</li>
            <li>Modélisation dimensionnelle avancée</li>
            <li>ETL haute performance et gouvernance des données</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📈 Dashboards & Reporting</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Tableaux de bord interactifs et temps réel</li>
            <li>Rapports automatisés et personnalisés</li>
            <li>KPI tracking et alertes intelligentes</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔮 Analyse Prédictive</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Modèles de forecasting et prévisions avancées</li>
            <li>Détection de tendances et patterns cachés</li>
            <li>Algorithmes de machine learning intégrés</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🛠️ Self-Service BI</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Outils d'analyse autonome pour les métiers</li>
            <li>Interface drag & drop intuitive</li>
            <li>Formation et accompagnement utilisateur</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 2rem; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; border: 2px solid #9c27b0;">
          <h4 style="color: #9c27b0; font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">📊 Solutions BI que nous créons</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏢</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Data Warehouse</div>
              <div style="font-size: 0.9rem; color: #666;">Entrepôts de données centralisés</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">📈</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Dashboards KPI</div>
              <div style="font-size: 0.9rem; color: #666;">Tableaux de bord temps réel</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">📊</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Cubes OLAP</div>
              <div style="font-size: 0.9rem; color: #666;">Analyse multidimensionnelle</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">📋</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Self-Service BI</div>
              <div style="font-size: 0.9rem; color: #666;">Outils autonomes pour métiers</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔮</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">Analytics prédictifs</div>
              <div style="font-size: 0.9rem; color: #666;">Forecasting et prévisions</div>
            </div>
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(156, 39, 176, 0.1); border: 1px solid #e8d5f2;">
              <div style="font-size: 2.5rem; margin-bottom: 1rem;">⚙️</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">ETL performants</div>
              <div style="font-size: 0.9rem; color: #666;">Pipelines de données automatisés</div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">💎 Impact business mesurable</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">+45%</div>
              <div style="font-size: 0.9rem; color: #666;">Productivité décisionnelle améliorée</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">-70%</div>
              <div style="font-size: 0.9rem; color: #666;">Temps de préparation des rapports</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">85%</div>
              <div style="font-size: 0.9rem; color: #666;">Précision des prévisions métier</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">24/7</div>
              <div style="font-size: 0.9rem; color: #666;">Accès aux données en temps réel</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Analyse des Besoins Décisionnels (2-3 semaines)', 
          desc: 'Cartographie des processus décisionnels existants, identification des KPI critiques métier, analyse des sources de données disponibles, définition des profils utilisateurs et de leurs besoins spécifiques en reporting et analyse.'
        },
        { 
          title: 'Architecture Data Warehouse (2-4 semaines)', 
          desc: 'Conception du modèle dimensionnel (étoile/flocon), définition des ETL et processus d\'intégration, architecture du data warehouse avec historisation, mise en place de la gouvernance des données et définition des méta-données.'
        },
        { 
          title: 'Développement ETL et Intégration (3-5 semaines)', 
          desc: 'Développement des processus d\'extraction et transformation, intégration des sources hétérogènes (ERP, CRM, fichiers), mise en place de la qualité des données, automatisation des flux de données et tests de cohérence et performance.'
        },
        { 
          title: 'Création des Cubes et Dashboards (3-4 semaines)', 
          desc: 'Modélisation des cubes OLAP pour l\'analyse multidimensionnelle, développement des tableaux de bord interactifs, création des rapports automatisés, mise en place des alertes métier et optimisation des performances d\'affichage.'
        },
        { 
          title: 'Déploiement et Formation (2-3 semaines)', 
          desc: 'Déploiement en production avec migration des données historiques, formation des utilisateurs finaux aux outils BI, mise en place de la gouvernance et des rôles d\'accès, documentation utilisateur complète et support post-déploiement.'
        }
      ],
      blog: [
        { date: '28 Mai 2025', title: 'Power BI vs Tableau : comparatif 2025', excerpt: 'Guide détaillé pour choisir la meilleure solution de Business Intelligence selon vos besoins.' },
        { date: '25 Mai 2025', title: 'Data Warehouse moderne : cloud-first approach', excerpt: 'Les architectures cloud-native révolutionnent la conception des entrepôts de données.' },
        { date: '22 Mai 2025', title: 'Self-Service BI : démocratiser l\'analyse', excerpt: 'Comment permettre aux métiers de créer leurs propres analyses sans dépendre de l\'IT.' }
      ]
    },
    'marketing-digital': {
      title: 'Marketing Digital',
      icon: '📈',
      overview: `
        <div class="persuasive-intro">
          <p><strong>📈 Explosez vos ventes avec le marketing digital !</strong></p>
          <p>⚡ <em>Nos clients augmentent leur chiffre d'affaires de 180% en moyenne grâce à nos stratégies.</em> Stop aux budgets marketing gaspillés ! Dominez votre marché avec nos campagnes ultra-ciblées qui transforment chaque euro investi en revenus exponentiels.</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🚀 Services marketing révolutionnaires :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔍 SEO & Référencement Payant</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Référencement naturel et payant optimisé</li>
            <li>Stratégie de contenu et mots-clés</li>
            <li>Campagnes Google Ads et Bing Ads</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📱 Social Media & Community</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Stratégie et gestion des réseaux sociaux</li>
            <li>Création de contenu engageant</li>
            <li>Community management et influence</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📧 Email Marketing & Automation</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Campagnes automatisées et personnalisées</li>
            <li>Workflows et nurturing leads</li>
            <li>Segmentation avancée et scoring</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📊 Analytics & Data Driven</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Mesure et optimisation des performances</li>
            <li>Tableaux de bord marketing KPI</li>
            <li>Tests A/B et optimisation continue</li>
          </ul>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">📈 Croissance explosive</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">+180%</div>
              <div style="font-size: 0.9rem; color: #666;">Augmentation moyenne du CA clients</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">-60%</div>
              <div style="font-size: 0.9rem; color: #666;">Réduction coût d'acquisition client</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">400%</div>
              <div style="font-size: 0.9rem; color: #666;">ROI marketing moyen constaté</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">90%</div>
              <div style="font-size: 0.9rem; color: #666;">Taux de rétention clients amélioré</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Audit Digital et Stratégie (2-3 semaines)', 
          desc: 'Analyse de la présence digitale actuelle (site, réseaux sociaux, SEO), étude de la concurrence et benchmark, définition des buyer personas et parcours client, audit des outils marketing existants et élaboration de la stratégie digitale globale.'
        },
        { 
          title: 'Optimisation SEO et Site Web (3-4 semaines)', 
          desc: 'Audit technique SEO complet du site web, optimisation on-page et structure des contenus, recherche de mots-clés et stratégie de contenu, amélioration de l\'expérience utilisateur et des conversions, mise en place du tracking analytics avancé.'
        },
        { 
          title: 'Campagnes Publicitaires Digitales (2-3 semaines)', 
          desc: 'Création des campagnes Google Ads et réseaux sociaux, définition des audiences et ciblages avancés, création des visuels et copies publicitaires, mise en place du tracking des conversions et optimisation continue des performances ROI.'
        },
        { 
          title: 'Marketing Automation et Email (2-3 semaines)', 
          desc: 'Mise en place des workflows d\'automation marketing, création des séquences d\'emails nurturing, segmentation avancée des bases de données, personnalisation des contenus selon les profils, intégration CRM et scoring des leads.'
        },
        { 
          title: 'Analytics et Optimisation Continue (Continu)', 
          desc: 'Configuration des tableaux de bord marketing KPI, analyse des performances et ROI par canal, tests A/B réguliers sur les campagnes et contenus, optimisation des tunnels de conversion, reporting mensuel avec recommandations stratégiques.'
        }
      ],
      blog: [
        { date: '30 Mai 2025', title: 'Marketing automation : booster ses conversions', excerpt: 'Stratégies avancées pour automatiser vos campagnes marketing et maximiser le ROI.' },
        { date: '27 Mai 2025', title: 'SEO 2025 : les nouvelles tendances', excerpt: 'Les évolutions du référencement naturel et les stratégies gagnantes pour 2025.' },
        { date: '24 Mai 2025', title: 'Social media B2B : guide complet', excerpt: 'Comment développer efficacement votre présence sur les réseaux sociaux en B2B.' }
      ]
    },
    'telephonie-ip': {
      title: 'Téléphonie IP',
      icon: '☎️',
      overview: `
        <div class="persuasive-intro">
          <p><strong>☎️ Révolutionnez vos communications d'entreprise !</strong></p>
          <p>⚡ <em>Économisez jusqu'à 60% sur vos coûts téléphoniques tout en doublant votre productivité.</em> Fini les lignes occupées et les frais exorbitants ! Passez à la téléphonie IP nouvelle génération qui transforme votre entreprise en hub de communication ultra-moderne et flexible.</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">📞 Solutions téléphoniques révolutionnaires :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">☁️ IPBX Cloud & Softphones</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Standard téléphonique virtualisé dans le cloud</li>
            <li>Applications téléphoniques sur ordinateurs et mobiles</li>
            <li>Configuration flexible et évolutive</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📹 Visioconférence & Collaboration</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Solutions de réunions vidéo intégrées</li>
            <li>Partage d'écran et collaboration temps réel</li>
            <li>Intégration avec Microsoft Teams et autres outils</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📞 Centre d'Appels & CRM</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Outils de gestion des appels entrants/sortants</li>
            <li>Couplage téléphonie-informatique (CTI)</li>
            <li>Statistiques et reporting avancés</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔧 Technologies & Protocoles</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Asterisk, FreePBX, Microsoft Teams Phone</li>
            <li>Solutions Cisco, Avaya et protocoles SIP/RTP</li>
            <li>Architecture redondante et haute disponibilité</li>
          </ul>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">💰 Économies substantielles</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">-60%</div>
              <div style="font-size: 0.9rem; color: #666;">Réduction des coûts téléphoniques</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">×2</div>
              <div style="font-size: 0.9rem; color: #666;">Amélioration de la productivité</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">100%</div>
              <div style="font-size: 0.9rem; color: #666;">Flexibilité télétravail garantie</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">24/7</div>
              <div style="font-size: 0.9rem; color: #666;">Support technique disponible</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Audit Téléphonique Existant (1-2 semaines)', 
          desc: 'Analyse de l\'infrastructure téléphonique actuelle, évaluation des coûts de communication, étude des besoins utilisateurs par service, audit de la qualité réseau et bande passante, identification des contraintes techniques et réglementaires.'
        },
        { 
          title: 'Conception Solution IP (2-3 semaines)', 
          desc: 'Dimensionnement de la solution IPBX selon les besoins, choix de l\'architecture (on-premise/cloud/hybride), définition du plan de numérotation et routage, conception de la redondance et haute disponibilité, validation de la conformité réglementaire.'
        },
        { 
          title: 'Déploiement Infrastructure (2-4 semaines)', 
          desc: 'Installation et configuration des serveurs IPBX, paramétrage des passerelles et trunks SIP, configuration des postes et softphones, mise en place de la sécurité (firewall, VPN), tests de qualité et latence réseau.'
        },
        { 
          title: 'Migration et Formation (2-3 semaines)', 
          desc: 'Migration progressive des numéros et services, portabilité des numéros existants, formation des utilisateurs aux nouvelles fonctionnalités, configuration des groupes d\'appels et messagerie, mise en place des procédures d\'urgence.'
        },
        { 
          title: 'Support et Optimisation (Continu)', 
          desc: 'Monitoring de la qualité des appels (QoS), support technique et maintenance préventive, optimisation des flux et routage d\'appels, mise à jour sécuritaire et fonctionnelle, formation continue et évolution des besoins.'
        }
      ],
      blog: [
        { date: '31 Mai 2025', title: 'Teams Phone : la téléphonie Microsoft', excerpt: 'Découvrez les avantages de la solution de téléphonie intégrée à Microsoft Teams.' },
        { date: '29 Mai 2025', title: 'Sécurité en téléphonie IP', excerpt: 'Bonnes pratiques pour sécuriser votre infrastructure de téléphonie sur IP.' },
        { date: '26 Mai 2025', title: 'Migration vers la téléphonie IP', excerpt: 'Guide complet pour réussir sa migration de la téléphonie traditionnelle vers l\'IP.' }
      ]
    },
    'automatisation-n8n': {
      title: 'Automatisation n8n',
      icon: '⚡',
      overview: `
        <div class="persuasive-intro">
          <p><strong>⚡ Libérez le potentiel caché de votre équipe !</strong></p>
          <p>🤖 <em>L'automatisation n8n fait économiser 50k€/an à nos clients en moyenne.</em> Stop aux tâches répétitives qui tuent la créativité ! Connectez tous vos outils en workflows intelligents qui travaillent pour vous 24/7. Vos concurrents automatisent déjà... ne restez pas à la traîne !</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🚀 Solutions d'automatisation révolutionnaires :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">⚙️ Workflows Sur Mesure</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Automatisation de processus métier complexes</li>
            <li>Logique conditionnelle et branchements intelligents</li>
            <li>Gestion d'erreurs et retry automatique</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔗 Intégrations & API</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>500+ connecteurs prêts à l'emploi</li>
            <li>Connexions API REST, GraphQL et webhooks</li>
            <li>Authentification OAuth et sécurisée</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">📊 Traitement & Transformation</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>ETL et synchronisation automatisée des données</li>
            <li>Transformation et enrichissement en temps réel</li>
            <li>Manipulation JSON, XML et formats propriétaires</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔔 Notifications & Monitoring</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Alertes intelligentes et rapports automatiques</li>
            <li>Surveillance des workflows et métriques de performance</li>
            <li>Notifications multi-canal (email, Slack, Teams)</li>
          </ul>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">💰 ROI exceptionnel</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">50k€</div>
              <div style="font-size: 0.9rem; color: #666;">Économies annuelles moyennes par client</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">20h</div>
              <div style="font-size: 0.9rem; color: #666;">Temps libéré par semaine</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">500+</div>
              <div style="font-size: 0.9rem; color: #666;">Intégrations disponibles</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">24/7</div>
              <div style="font-size: 0.9rem; color: #666;">Workflows actifs en continu</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Analyse des Processus Métier (1-2 semaines)', 
          desc: 'Cartographie des workflows existants et identification des tâches répétitives, analyse des outils et applications utilisés par les équipes, évaluation du potentiel d\'automatisation et ROI estimé, priorisation des cas d\'usage selon l\'impact business.'
        },
        { 
          title: 'Conception des Workflows (1-2 semaines)', 
          desc: 'Modélisation des flux automatisés avec n8n, définition des triggers et conditions d\'exécution, conception de la logique métier et des transformations de données, validation des workflows avec les utilisateurs finaux, documentation technique des processus.'
        },
        { 
          title: 'Développement et Configuration (2-4 semaines)', 
          desc: 'Installation et configuration de l\'instance n8n (cloud/self-hosted), développement des workflows avec les nœuds appropriés, configuration des authentifications et connexions API, mise en place de la gestion d\'erreurs et retry logic, tests unitaires et d\'intégration.'
        },
        { 
          title: 'Tests et Validation Métier (1-2 semaines)', 
          desc: 'Tests en environnement de pré-production avec données réelles, validation fonctionnelle avec les équipes métier, tests de charge et performance des workflows, correction des bugs et optimisation, validation de la conformité sécuritaire.'
        },
        { 
          title: 'Déploiement et Formation (1 semaine)', 
          desc: 'Mise en production des workflows avec migration progressive, formation des équipes à l\'utilisation et monitoring, documentation utilisateur et procédures de maintenance, mise en place des alertes et monitoring automatique.'
        },
        { 
          title: 'Support et Évolution (Continu)', 
          desc: 'Monitoring des performances et erreurs des workflows, support technique réactif, optimisation continue selon les retours utilisateurs, développement de nouveaux workflows selon les besoins, maintenance et mises à jour de n8n.'
        }
      ],
      blog: [
        { date: '2 Juin 2025', title: 'n8n vs Zapier : comparatif des outils d\'automatisation', excerpt: 'Analyse détaillée pour choisir la meilleure solution d\'automatisation pour votre entreprise.' },
        { date: '1 Juin 2025', title: 'ROI de l\'automatisation : mesurer les gains', excerpt: 'Comment calculer et maximiser le retour sur investissement de vos projets d\'automatisation.' },
        { date: '28 Mai 2025', title: 'Workflows n8n avancés : bonnes pratiques', excerpt: 'Techniques avancées pour créer des workflows robustes et maintenables avec n8n.' }
      ]
    },
    'conseil-transformation': {
      title: 'Conseil et Transformation',
      icon: '🎯',
      overview: `
        <div class="persuasive-intro">
          <p><strong>🎯 Révolutionnez votre approche IT avec notre expertise conseil !</strong></p>
          <p>💡 <em>Boostez vos performances numériques et divisez vos coûts informatiques par deux.</em> Faites de votre Direction des Systèmes d'Information un véritable levier de croissance ! Notre accompagnement stratégique propulse votre organisation vers l'excellence opérationnelle et l'innovation continue.</p>
        </div>
        
        <div style="margin: 2rem 0;">
          <h4 style="color: var(--primary-blue); margin-bottom: 1.5rem; font-size: 1.3rem;">🛠️ Notre palette d'expertises complète :</h4>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%); border-radius: 12px; border-left: 4px solid var(--primary-blue);">
          <h5 style="color: var(--primary-blue); font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🔍 Diagnostic et Vision Stratégique DSI</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Évaluation approfondie des performances et maturité informatique</li>
            <li>Élaboration du Schéma Directeur et roadmap digitale</li>
            <li>Conception de stratégies de transformation numérique</li>
            <li>Modélisation financière et valorisation des bénéfices</li>
            <li>Méthodologies d'optimisation permanente</li>
            <li>Contrats de service managés et indicateurs de performance</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0f8ff 0%, #e0f0ff 100%); border-radius: 12px; border-left: 4px solid #4285f4;">
          <h5 style="color: #4285f4; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🏗️ Conception Architecturale d'Entreprise</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Structuration et modernisation du Système d'Information</li>
            <li>Expertise en conception d'architectures techniques</li>
            <li>Rédaction de cahiers des charges et appels d'offres</li>
            <li>Accompagnement dans la sélection de partenaires technologiques</li>
            <li>Pilotage des standards et référentiels architecturaux</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #fff8f0 0%, #ffe8d0 100%); border-radius: 12px; border-left: 4px solid #ff9800;">
          <h5 style="color: #ff9800; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">⚡ Excellence en Pilotage de Projets</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Direction de programmes de transformation critiques</li>
            <li>Redressement et optimisation de projets en difficulté</li>
            <li>Mise en place de Bureau de Gestion de Projets (PMO)</li>
          </ul>
        </div>
        
        <div style="margin-bottom: 2.5rem; padding: 1.5rem; background: linear-gradient(135deg, #f0fff0 0%, #e0ffe0 100%); border-radius: 12px; border-left: 4px solid #4caf50;">
          <h5 style="color: #4caf50; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">🛡️ Maîtrise des Enjeux Sécuritaires et Data</h5>
          <ul style="line-height: 1.8; margin-left: 1rem;">
            <li>Définition des Politiques de Sécurité SI et accompagnement RSSI</li>
            <li>Certification et mise en conformité ISO 27001/2</li>
            <li>Élaboration de Plans de Continuité d'Activité robustes</li>
            <li>Déploiement de solutions IAM, SIEM, CASB et DLP</li>
          </ul>
        </div>
        
        <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f5f8ff 0%, #e8f2ff 100%); border-radius: 16px; border: 2px solid var(--primary-blue); box-shadow: 0 8px 24px rgba(0, 102, 255, 0.1);">
          <h4 style="color: var(--primary-blue); font-weight: bold; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center;">📈 Résultats tangibles garantis</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">×1.6</div>
              <div style="font-size: 0.9rem; color: #666;">Multiplication de l'efficacité des services IT</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #4caf50; margin-bottom: 0.5rem;">-35%</div>
              <div style="font-size: 0.9rem; color: #666;">Réduction des dépenses informatiques</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #ff9800; margin-bottom: 0.5rem;">95%</div>
              <div style="font-size: 0.9rem; color: #666;">Taux de réussite des projets après PMO</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-size: 2rem; font-weight: bold; color: #9c27b0; margin-bottom: 0.5rem;">280%</div>
              <div style="font-size: 0.9rem; color: #666;">ROI constaté en moins de 2 ans</div>
            </div>
          </div>
        </div>
      `,
      workflow: [
        { 
          title: 'Audit et Diagnostic SI (3-4 semaines)', 
          desc: 'Audit complet de l\'architecture existante, évaluation de la maturité des processus SI, analyse des coûts et performance, cartographie des applications et infrastructures, identification des points de friction et opportunités d\'amélioration.'
        },
        { 
          title: 'Stratégie et Roadmap (2-3 semaines)', 
          desc: 'Définition de la stratégie SI alignée sur les objectifs business, élaboration du schéma directeur et de la roadmap de transformation, priorisation des initiatives selon l\'impact et la complexité, budgétisation détaillée et calcul du ROI.'
        },
        { 
          title: 'Architecture et Gouvernance (3-4 semaines)', 
          desc: 'Conception de l\'architecture cible, mise en place de la gouvernance des projets et du PMO, définition des référentiels et standards, création des processus de pilotage et de contrôle, formation des équipes aux nouvelles pratiques.'
        },
        { 
          title: 'Plan de Transformation (4-6 semaines)', 
          desc: 'Déploiement du plan de transformation par phases, accompagnement du changement organisationnel, mise en place des outils de pilotage et reporting, migration progressive vers l\'architecture cible, conduite du changement utilisateur.'
        },
        { 
          title: 'Sécurité et Conformité (2-3 semaines)', 
          desc: 'Audit de sécurité et mise en conformité réglementaire, déploiement des politiques de sécurité (PSSI), mise en place des outils IAM, SIEM, DLP, formation à la cybersécurité, tests et validation des mesures de protection.'
        },
        { 
          title: 'Optimisation Continue (Continu)', 
          desc: 'Monitoring des KPIs de performance SI, optimisation continue des processus, évolution de l\'architecture selon les besoins, support et accompagnement des équipes, reporting régulier et recommandations d\'amélioration.'
        }
      ],
      blog: [
        { date: '5 Juin 2025', title: 'Transformation digitale : par où commencer ?', excerpt: 'Méthodologie éprouvée pour réussir sa transformation digitale en 6 étapes clés.' },
        { date: '3 Juin 2025', title: 'Architecture d\'entreprise : enjeux et bénéfices', excerpt: 'Comment l\'urbanisation du SI optimise la performance et réduit les coûts IT.' },
        { date: '1 Juin 2025', title: 'PMO : accélérateur de projets', excerpt: 'Les bonnes pratiques pour mettre en place un PMO efficace et performant.' }
      ]
    },
    'formations': {
      title: 'Formations Technologiques',
      icon: '🎓',
      overview: `
        <p>Développez les compétences de vos équipes avec nos formations expertes adaptées à tous les niveaux.</p>
        <h4>Modalités de formation :</h4>
        <ul>
          <li><strong>Présentiel:</strong> Dans nos locaux ou chez vous</li>
          <li><strong>Distanciel:</strong> Sessions interactives en ligne</li>
          <li><strong>Hybride:</strong> Combinaison présentiel/distanciel</li>
          <li><strong>E-learning:</strong> Parcours autonomes avec mentoring</li>
        </ul>
        <h4>Certifications disponibles :</h4>
        <p>Préparation aux certifications AWS, Google Cloud, Microsoft Azure, Kubernetes, Scrum Master</p>
      `,
      workflow: [
        { 
          title: 'Évaluation des Compétences & Besoins (3-5 jours)', 
          desc: 'Assessment technique individuel et collectif, analyse des gaps de compétences par rapport aux objectifs métier, identification des profils d\'apprentissage, définition des KPIs de formation et validation des prérequis techniques par participant.'
        },
        { 
          title: 'Conception Pédagogique Sur Mesure (1-2 semaines)', 
          desc: 'Création du parcours de formation adapté aux niveaux détectés, développement des supports pédagogiques interactifs, conception des exercices pratiques et projets fil rouge, adaptation du contenu au secteur d\'activité et définition des modalités d\'évaluation.'
        },
        { 
          title: 'Planification & Préparation (1 semaine)', 
          desc: 'Organisation du planning de formation optimisé, préparation des environnements de travail (labs, plateformes), configuration des outils et licences nécessaires, coordination avec les managers pour libération des participants et préparation des ressources documentaires.'
        },
        { 
          title: 'Déroulement de la Formation (Selon programme)', 
          desc: 'Sessions théoriques avec démonstrations live, ateliers pratiques sur projets concrets, code reviews et pair programming, mentorat individualisé selon les besoins, évaluations intermédiaires avec feedback constructif et adaptation du rythme selon la progression du groupe.'
        },
        { 
          title: 'Évaluation & Certification (2-3 jours)', 
          desc: 'Évaluation pratique sur projet réel, tests de compétences techniques approfondis, préparation aux certifications officielles si applicable, remise des certificats de formation weenoov et bilan individuel des acquis avec recommandations de progression.'
        },
        { 
          title: 'Suivi Post-Formation & Support (3 mois)', 
          desc: 'Accompagnement sur les premiers projets en autonomie, sessions de Q&A hebdomadaires avec les formateurs, accès aux ressources et mises à jour pédagogiques, évaluation de l\'impact sur les projets réels et recommandations pour la formation continue.'
        }
      ],
      blog: [
        { date: '24 Mai 2025', title: 'Upskilling tech : investir dans les équipes', excerpt: 'Pourquoi et comment former vos équipes aux nouvelles technologies pour rester compétitif.' },
        { date: '20 Mai 2025', title: 'Certification cloud : laquelle choisir ?', excerpt: 'Guide pour choisir la certification cloud adaptée à votre profil et objectifs.' },
        { date: '15 Mai 2025', title: 'Formation continue en tech', excerpt: 'L\'importance de la formation continue dans un secteur en évolution permanente.' }
      ],
      formations: [
        {
          title: 'Développement Web Full-Stack',
          duration: '30 heures - 8 jours',
          price: '399€',
          features: ['HTML5, CSS3, JavaScript ES6+', 'React.js et Node.js', 'Base de données et API', 'Projet final', 'Certificat de réussite'],
          description: "🚀 Transformez-vous en développeur recherché ! Cette formation intensive vous propulse de zéro à héros du développement. En seulement 5 jours, maîtrisez les technologies les plus demandées par les entreprises. Nos anciens stagiaires ont augmenté leur salaire de 35% en moyenne ! Ne laissez pas passer cette opportunité limitée."
        },
        {
          title: 'Intelligence Artificielle & Machine Learning',
          duration: '35 heures - 10 jours',
          price: '499€',
          features: ['Python pour l\'IA', 'Scikit-learn, TensorFlow', 'Deep Learning', 'Projet ML concret', 'Cas d\'usage métier'],
          description: "🤖 Surfez sur la vague IA avant qu'il ne soit trop tard ! L'IA va remplacer 40% des emplois... ou les transformer. Soyez du bon côté. Formation qui vous positionne sur les métiers d'avenir. Nos participants multiplient leur valeur par 3 sur le marché !"
        },
        {
          title: 'Cybersécurité',
          duration: '45 heures - 12 jours',
          price: '699€',
          features: ['Audit de sécurité', 'Tests d\'intrusion', 'Réponse aux incidents', 'Outils professionnels', 'Certification incluse'],
          description: "🛡️ Protégez-vous des 4000 cyberattaques quotidiennes ! Le secteur cybersécurité recrute 3.5M de postes dans le monde. Salaires moyens : 70k€+. Formation par d'anciens hackers éthiques. Accès exclusif aux outils pros. Votre passeport pour l'emploi sécurisé !"
        },
        {
          title: 'Atelier Accéléré sur les Méthodes et Outils Agile',
          duration: '12 heures - 4 jours',
          price: '299€',
          features: ['Scrum & Kanban maîtrisés', 'Jira & Azure DevOps', 'Retrospectives efficaces', 'Planning Poker', 'Certification Scrum Master'],
          description: "⚡ Révolutionnez votre façon de travailler ! Rejoignez les 97% de nos participants qui ont transformé leur productivité en équipe. Apprenez les secrets des entreprises Tech les plus performantes. Formation intensive avec des coachs agile certifiés. Places limitées à 12 participants pour un accompagnement personnalisé !"
        },
        {
          title: 'Automatisation n8n sur-mesure',
          duration: '12 heures - 4 jours',
          price: '350€',
          features: ['Maîtrise complète n8n', '500+ intégrations', 'Workflows complexes', 'Monitoring & alerting', 'ROI automation'],
          description: "🤖 Libérez 20h/semaine de tâches répétitives ! L'automatisation n8n fait économiser 50k€/an à nos clients. Connectez tous vos outils sans coder. Formation exclusive avec le créateur de n8n France. Places ultra-limitées : seulement 8 participants max !"
        },
        {
          title: 'Initiation à Docker et Sécurité des Conteneurs',
          duration: '15 heures - 5 jours',
          price: '299€',
          features: ['Docker de A à Z', 'Kubernetes basics', 'Sécurité conteneurs', 'CI/CD avec containers', 'Best practices DevOps'],
          description: "🔐 Maîtrisez la technologie qui fait tourner Netflix, Google et Amazon ! Docker révolutionne le déploiement d'applications. Cette formation vous donne 3 ans d'avance sur la concurrence. 89% de nos participants sont promus dans les 6 mois. Investissement garanti rentable !"
        },
        {
          title: 'Introduction à la Programmation R et Analyse de Données',
          duration: '20 heures - 5 jours',
          price: '399€',
          features: ['R Programming complet', 'Visualisation avec ggplot2', 'Analyse statistique', 'Machine Learning basics', 'Projets data concrets'],
          description: "📊 Devenez le Data Scientist que tout le monde s'arrache ! Le salaire moyen d'un expert R dépasse 65k€. Cette formation vous ouvre les portes des métiers les plus recherchés. Apprentissage pratique sur de vraies données d'entreprises. Résultats visibles dès le premier jour !"
        },
        {
          title: 'Atelier Git, GitHub et GitHub Actions',
          duration: '12 heures - 3 jours',
          price: '250€',
          features: ['Git avancé', 'GitHub collaboration', 'GitHub Actions CI/CD', 'Code review workflow', 'Open source contribution'],
          description: "⭐ Arrêtez de perdre votre code ! Rejoignez les 100M+ de développeurs qui utilisent Git quotidiennement. Formation pratique qui vous évite les erreurs coûteuses. Nos participants économisent 2h/jour en moyenne. ROI immédiat garanti !"
        },
        {
          title: 'Design Thinking',
          duration: '12 heures - 3 jours',
          price: '330€',
          features: ['Méthodologie Design Thinking', 'Empathy mapping', 'Prototypage rapide', 'Tests utilisateurs', 'Innovation collaborative'],
          description: "💡 Innovez comme Apple, Google et Tesla ! Le Design Thinking a généré +500M$ d'innovation chez nos clients. Méthode éprouvée pour créer des produits que vos clients adorent. Formation animée par des consultants ayant accompagné les licornes françaises. Changez votre approche, changez vos résultats !"
        },
      ]
    }
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    document.body.setAttribute('data-theme', !isDarkTheme ? 'dark' : '')
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const openServiceModal = (serviceKey) => {
    setModalService(serviceKey)
    setActiveTab('overview')
  }

  const closeModal = () => {
    setModalService(null)
  }



  const submitContact = (e) => {
    e.preventDefault()
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.')
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    setShowBackToTop(scrollTop > 500)
  }

  useEffect(() => {
    // Apply theme
    if (isDarkTheme) {
      document.body.setAttribute('data-theme', 'dark')
    } else {
      document.body.removeAttribute('data-theme')
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach(el => observer.observe(el))

    // Add scroll event listener for back-to-top button
    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      fadeElements.forEach(el => observer.unobserve(el))
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isDarkTheme])

  // useEffect pour le bandeau de conception
  useEffect(() => {
    if (showConstructionBanner) {
      const timer = setTimeout(() => {
        setShowConstructionBanner(false)
      }, 5000) // Disparaît après 5 secondes
      
      return () => clearTimeout(timer)
    }
  }, [showConstructionBanner])

  // useEffect pour les paramètres de cookies
  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix de cookies
    const cookieChoice = localStorage.getItem('cookiePreferences')
    if (!cookieChoice) {
      // Afficher les paramètres de cookies après 2 secondes
      const timer = setTimeout(() => {
        setShowCookieSettings(true)
      }, 2000)
      
      return () => clearTimeout(timer)
    } else {
      // Charger les préférences sauvegardées
      setCookiePreferences(JSON.parse(cookieChoice))
    }
  }, [])

  // Fonctions pour gérer les cookies
  const handleAcceptAllCookies = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    }
    setCookiePreferences(allAccepted)
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted))
    setShowCookieSettings(false)
  }

  const handleRejectAllCookies = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
    setCookiePreferences(onlyNecessary)
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyNecessary))
    setShowCookieSettings(false)
  }

  const handleCustomizeCookies = () => {
    setShowCookieModal(true)
  }

  const handleSaveCookiePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences))
    setShowCookieSettings(false)
    setShowCookieModal(false)
  }

  const toggleCookieCategory = (category) => {
    if (category === 'necessary') return // Les cookies nécessaires ne peuvent pas être désactivés
    setCookiePreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  return (
    <div>
      {/* Construction Banner */}
      {showConstructionBanner && (
        <div className={`construction-banner ${!showConstructionBanner ? 'hidden' : ''}`}>
          <div className="construction-banner-content">
            <div className="construction-icon">🚧</div>
            <div>
              <span className="construction-text">Site en construction</span>
              <span className="construction-subtext">- Version bêta en cours de développement</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="logo">weenoov</div>
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#workflow">Processus</a></li>
            <li><a href="#formations">Formations</a></li>
            <li><a href="#about">À propos</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkTheme ? '☀️' : '🌙'}
          </button>
          <div 
            className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="hero">
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Solutions Tech <span className="highlight">Innovantes</span> pour votre Entreprise</h1>
            <p>Ensemble, donnons vie à vos ambitions numériques. Nous co-créons des solutions sur mesure et innovantes, alliant expertise en développement web/mobile, IA, cybersécurité, cloud, la valorisation de vos données et conseil stratégique pour concrétiser vos projets les plus ambitieux.</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => setShowBookingModal(true)}>Prenez rendez-vous</button>
              <a href="#services" className="btn-secondary">Découvrir nos services</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-elements">
              <div className="floating-card">
                <div className="service-icon">🌐</div>
                <strong>Développement Web & Mobile</strong>
              </div>
              <div className="floating-card">
                <div className="service-icon">🤖</div>
                <strong>Intelligence Artificielle</strong>
              </div>
              <div className="floating-card">
                <div className="service-icon">🔒</div>
                <strong>Cybersécurité</strong>
              </div>
              <div className="floating-card">
                <div className="service-icon">⛓️</div>
                <strong>Blockchain</strong>
              </div>
              <div className="floating-card">
                <div className="service-icon">🛡️</div>
                <strong>Gouvernance des données & Accompagnement dans la conformité</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-title fade-in">
            <h2>Nos Expertises Technologiques</h2>
            <p>Une gamme complète de services pour accompagner votre transformation digitale</p>
          </div>
          <div className="services-grid">
            <div className="service-card fade-in" onClick={() => openServiceModal('web-dev')}>
              <div className="service-icon">🌐</div>
              <h3>Développement Web, Desktop & Mobile</h3>
              <p>Création d'applications web responsives, d'applications desktop multiplateformes et d'applications mobiles natives pour iOS et Android. Nous utilisons les dernières technologies pour garantir performance et user experience.</p>
              <div className="card-arrow">→</div>
            </div>
            <div className="service-card fade-in" onClick={() => openServiceModal('websites')}>
              <div className="service-icon">🎨</div>
              <h3>Sites Vitrines</h3>
              <p>Design et développement de sites web modernes et optimisés pour présenter votre entreprise. SEO intégré, performance optimisée et design adaptatif pour tous les appareils.</p>
              <div className="card-arrow">→</div>
            </div>
            <div className="service-card fade-in" onClick={() => openServiceModal('ai-data')}>
              <div className="service-icon">🤖</div>
              <h3>Intelligence Artificielle & Data Science</h3>
              <p>Solutions IA personnalisées et analyse avancée de données : machine learning, NLP, vision par ordinateur, modélisation prédictive et tableaux de bord interactifs pour optimiser vos processus.</p>
              <div className="card-arrow">→</div>
            </div>
            <div className="service-card fade-in" onClick={() => openServiceModal('cybersecurity')}>
              <div className="service-icon">🔒</div>
              <h3>Cybersécurité</h3>
              <p>Audit de sécurité, mise en place de solutions de protection, sensibilisation des équipes et monitoring continu pour protéger vos actifs numériques contre les menaces.</p>
              <div className="card-arrow">→</div>
            </div>
            <div className="service-card fade-in" onClick={() => openServiceModal('blockchain')}>
              <div className="service-icon">⛓️</div>
              <h3>Blockchain</h3>
              <p>Développement d'applications décentralisées (DApps), smart contracts, solutions NFT et intégration blockchain pour la traçabilité et la sécurisaton des transactions.</p>
              <div className="card-arrow">→</div>
            </div>
            <div className="service-card fade-in" onClick={() => openServiceModal('conformite-donnees')}>
              <div className="service-icon">🛡️</div>
              <h3>Gouvernance des données & Accompagnement dans la conformité</h3>
              <p>Gouvernance des données, audit de conformité, gouvernance SSI, assistance DPO, DPO externalisé, formation DPO et sensibilisation selon la loi guinéenne L/2016/037/AN et la future APDP.</p>
              <div className="card-arrow">→</div>
            </div>
            <div className="service-card fade-in" onClick={() => openServiceModal('cloud-devops')}>
              <div className="service-icon">☁️</div>
              <h3>Cloud & DevOps</h3>
              <p>Migration cloud, infrastructure as code, CI/CD, containerisation avec Docker/Kubernetes et automatisation des déploiements pour une scalabilité optimale.</p>
              <div className="card-arrow">→</div>
            </div>

            <div className="service-card fade-in" onClick={() => openServiceModal('exploitation-maintenance')}>
              <div className="service-icon">🔧</div>
              <h3>Exploitation et Maintenance</h3>
              <p>Assurez la continuité et les performances optimales de vos systèmes informatiques avec nos services d'exploitation et de maintenance proactifs. Monitoring 24/7, support technique et optimisation continue.</p>
              <div className="card-arrow">→</div>
            </div>
            <div className="service-card fade-in" onClick={() => openServiceModal('modelisation-decisionnelle')}>
              <div className="service-icon">📊</div>
              <h3>Modélisation Décisionnelle</h3>
              <p>Transformez vos données en insights stratégiques avec nos solutions de Business Intelligence. Data warehouses, tableaux de bord interactifs et analyse prédictive pour optimiser vos décisions.</p>
              <div className="card-arrow">→</div>
            </div>
            <div className="service-card fade-in" onClick={() => openServiceModal('marketing-digital')}>
              <div className="service-icon">📈</div>
              <h3>Marketing Digital</h3>
              <p>Boostez votre présence digitale et optimisez vos conversions avec nos stratégies marketing data-driven. SEO/SEA, réseaux sociaux, email marketing et marketing automation.</p>
              <div className="card-arrow">→</div>
            </div>
            <div className="service-card fade-in" onClick={() => openServiceModal('telephonie-ip')}>
              <div className="service-icon">☎️</div>
              <h3>Téléphonie IP</h3>
              <p>Modernisez votre système de communication d'entreprise avec nos solutions de téléphonie IP flexibles et économiques. IPBX cloud, softphones et intégration CRM.</p>
              <div className="card-arrow">→</div>
            </div>
            <div className="service-card fade-in" onClick={() => openServiceModal('automatisation-n8n')}>
              <div className="service-icon">⚡</div>
              <h3>Automatisation n8n sur-mesure</h3>
              <p>Automatisez vos workflows métier avec n8n pour booster votre productivité et éliminer les tâches répétitives. Plus de 500 intégrations disponibles pour connecter tous vos outils.</p>
              <div className="card-arrow">→</div>
            </div>
            <div className="service-card fade-in" onClick={() => openServiceModal('conseil-transformation')}>
              <div className="service-icon">🎯</div>
              <h3>Conseil et Transformation</h3>
              <p>Accompagnement stratégique pour votre transformation digitale. Audit DSI, architecture d'entreprise, gouvernance de projets et stratégie sécuritaire pour optimiser votre système d'information.</p>
              <div className="card-arrow">→</div>
            </div>
          </div>
        </div>
      </section>

      {/* Formations Section */}
      <section id="formations" className="formations">
        <div className="container">
          <div className="section-title fade-in">
            <h2>🎓 Formations Technologiques</h2>
            <p>Développez les compétences de vos équipes avec nos formations expertes adaptées à tous les niveaux</p>
          </div>
          <div className="formation-grid">
            {serviceData.formations.formations.map((formation, index) => (
              <div key={index} className="formation-card fade-in">
                <div className="formation-header">
                  <h4>{formation.title}</h4>
                  <span className="formation-price">{formation.price}</span>
                </div>
                <div className="formation-duration">{formation.duration}</div>
                <div className="formation-description" style={{margin: '1rem 0', padding: '1rem', backgroundColor: 'var(--light-bg)', borderRadius: '8px', fontSize: '0.9rem', lineHeight: '1.4'}}>
                  {formation.description}
                </div>
                <ul className="formation-features">
                  {formation.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setSelectedFormation(formation)
                    setShowContactModal(true)
                  }}
                >
                  Réserver cette formation
                </button>
              </div>
            ))}
          </div>
          <div className="formation-info fade-in">
            <div className="info-grid">
              <div className="info-item">
                <h4>📍 Modalités</h4>
                <p>Présentiel, distanciel ou hybride selon vos préférences</p>
              </div>
              <div className="info-item">
                <h4>🎯 Sur-mesure</h4>
                <p>Contenu adapté à votre niveau et vos objectifs</p>
              </div>
              <div className="info-item">
                <h4>📜 Certification</h4>
                <p>Certificats weenoov et préparation aux certifications officielles</p>
              </div>
              <div className="info-item">
                <h4>🤝 Support</h4>
                <p>3 mois d'accompagnement post-formation inclus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <div className="section-title fade-in">
            <h2>Pourquoi Nous Choisir ?</h2>
            <p>Notre expertise et notre approche client nous distinguent dans l'univers tech</p>
          </div>
          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">🚀</div>
              <h3>Innovation Constante</h3>
              <p>Nous restons à la pointe des dernières technologies pour vous offrir des solutions d'avant-garde qui anticipent les besoins de demain.</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">⚡</div>
              <h3>Livraison Rapide</h3>
              <p>Méthodologie agile et équipes dédiées pour des projets livrés dans les délais, sans compromis sur la qualité.</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">🎯</div>
              <h3>Approche Sur Mesure</h3>
              <p>Chaque projet est unique. Nous adaptons nos solutions à vos besoins spécifiques et à votre secteur d'activité.</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">🛡️</div>
              <h3>Sécurité Maximale</h3>
              <p>La cybersécurité est au cœur de nos développements. Vos données et systèmes sont protégés selon les plus hauts standards.</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">💡</div>
              <h3>Conseil Expert</h3>
              <p>Notre équipe vous accompagne dans la définition de votre stratégie digitale pour maximiser votre retour sur investissement.</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">🤝</div>
              <h3>Support Premium</h3>
              <p>Accompagnement continu, formation des équipes et support technique réactif pour garantir votre succès.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container">
          <div className="section-title fade-in">
            <h2>Ils Nous Font Confiance</h2>
            <p>Plus de 150 entreprises nous ont fait confiance pour leur transformation digitale</p>
          </div>
          
          <div className="clients-grid fade-in">
            <div className="client-logo">
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)'}}>TechCorp</div>
            </div>
            <div className="client-logo">
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)'}}>InnovLab</div>
            </div>
            <div className="client-logo">
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)'}}>DataFlow</div>
            </div>
            <div className="client-logo">
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)'}}>SmartSys</div>
            </div>
            <div className="client-logo">
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)'}}>CloudTech</div>
            </div>
            <div className="client-logo">
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)'}}>SecureNet</div>
            </div>
          </div>

          <div className="testimonials">
            <div className="testimonial-card fade-in">
              <p className="testimonial-text">
                "weenoov a transformé notre infrastructure IT. Leur expertise en cloud et cybersécurité nous a permis de sécuriser notre croissance tout en optimisant nos coûts."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <h4>Jean Dupont</h4>
                  <p>CTO, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card fade-in">
              <p className="testimonial-text">
                "L'équipe weenoov a développé notre plateforme IA en un temps record. Leur approche agile et leur expertise technique sont remarquables."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">ML</div>
                <div className="author-info">
                  <h4>Marie Laurent</h4>
                  <p>CEO, InnovLab</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card fade-in">
              <p className="testimonial-text">
                "Grâce à weenoov, nous avons modernisé toute notre stack technique. Leur accompagnement et leur support sont exceptionnels."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">PR</div>
                <div className="author-info">
                  <h4>Pierre Rodriguez</h4>
                  <p>Directeur Digital, DataFlow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="workflow">
        <div className="container">
          <div className="section-title fade-in">
            <h2>Notre Méthode de Travail</h2>
            <p>Une méthodologie éprouvée pour garantir le succès de vos projets</p>
          </div>
          <div className="workflow-steps">
            <div className="workflow-step fade-in">
              <div className="step-number">1</div>
              <h3>Analyse & Découverte</h3>
              <p>Nous analysons vos besoins, définis les objectifs et élaborons une stratégie personnalisée pour votre projet.</p>
            </div>
            <div className="workflow-step fade-in">
              <div className="step-number">2</div>
              <h3>Conception & Planification</h3>
              <p>Création des maquettes, architecture technique et planification détaillée avec validation à chaque étape.</p>
            </div>
            <div className="workflow-step fade-in">
              <div className="step-number">3</div>
              <h3>Développement Agile</h3>
              <p>Développement itératif avec des livraisons régulières et des tests continus pour assurer la qualité.</p>
            </div>
            <div className="workflow-step fade-in">
              <div className="step-number">4</div>
              <h3>Tests & Validation</h3>
              <p>Tests complets, validation utilisateur et optimisation des performances avant la mise en production.</p>
            </div>
            <div className="workflow-step fade-in">
              <div className="step-number">5</div>
              <h3>Déploiement & Suivi</h3>
              <p>Mise en production sécurisée, formation des utilisateurs et support continu pour garantir le succès.</p>
            </div>
          </div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-title fade-in">
            <h2>À propos de weenoov</h2>
            <p>Votre partenaire technologique de confiance pour l'innovation digitale.</p>
          </div>
          <div className="about-content">
            <div className="about-text fade-in">
              <div className="about-story">
                <h3>🚀 Notre Mission</h3>
                <p>
                  Chez weenoov, nous croyons que la technologie doit être au service de l'humain et des entreprises. 
                  Notre mission est de démocratiser l'accès aux technologies de pointe en proposant des solutions 
                  sur-mesure qui répondent aux défis spécifiques de chaque client.
                </p>
              </div>
              
              <div className="about-story">
                <h3>💡 Notre Vision</h3>
                <p>
                  Nous aspirons à devenir le partenaire technologique de référence qui transforme les idées 
                  en solutions innovantes. Nous accompagnons nos clients dans leur transformation digitale 
                  en alliant expertise technique, créativité et approche humaine.
                </p>
              </div>
              
              <div className="about-story">
                <h3>🌟 Nos Valeurs</h3>
                <div className="values-grid">
                  <div className="value-item">
                    <h4>Excellence</h4>
                    <p>Nous visons l'excellence dans chaque projet, en utilisant les meilleures pratiques et technologies.</p>
                  </div>
                  <div className="value-item">
                    <h4>Innovation</h4>
                    <p>Nous restons à la pointe des innovations pour offrir des solutions d'avant-garde.</p>
                  </div>
                  <div className="value-item">
                    <h4>Transparence</h4>
                    <p>Communication claire, processus transparents et collaboration étroite avec nos clients.</p>
                  </div>
                  <div className="value-item">
                    <h4>Agilité</h4>
                    <p>Adaptabilité et réactivité pour répondre rapidement aux besoins changeants du marché.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="about-stats fade-in">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Projets réalisés</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Années d'expérience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Clients satisfaits</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support disponible</div>
                </div>
              </div>
            </div>
          </div>
          

        </div>
      </section>
      

      {/* Team Section */}
      <section id="team" className="team">
        <div className="container">
          <div className="section-title fade-in">
            <h2>L'équipe</h2>
            <p>Une équipe d'experts passionnés au service de vos projets</p>
          </div>
          <div className="team-grid">
            <div className="team-member fade-in">
              <div className="member-avatar">
                <img 
                  src="/images/elodie.jpg" 
                  alt="Elodie BANTOS"
                  className="member-photo"
                />
              </div>
              <h3>Elodie BANTOS</h3>
              <h4>Machine Learning Engineer & Product Owner</h4>
              <p>Je développe des modèles d’intelligence artificielle performants tout en assurant la gestion stratégique du produit, de l’idée à la livraison.</p>
            </div>
            <div className="team-member fade-in">
              <div className="member-avatar">
                <img 
                  src="/images/noumouke.jpg" 
                  alt="Noumouké SOUARE"
                  className="member-photo"
                />
              </div>
              <h3>Noumouké SOUARE</h3>
              <h4>Gérant & Ingénieur Logiciel</h4>
              <p>Je mets en œuvre un management d'équipe structuré et une ingénierie logicielle rigoureuse pour garantir le succès de vos projets digitaux.</p>
            </div>
            <div className="team-member fade-in">
              <div className="member-avatar">
                <img 
                  src="/images/aime.jpg" 
                  alt="Aimé BERTRAND"
                  className="member-photo"
                />
              </div>
              <h3>Aimé BERTRAND</h3>
              <h4>Ing. Sécurité & Développeur Blockchain</h4>
              <p>Je sécurise les systèmes d’information tout en développant des applications blockchain robustes et innovantes.</p>
            </div>
            <div className="team-member fade-in">
              <div className="member-avatar">
                <img 
                  src="/images/alassane.jpg" 
                  alt="Alassane MARIKO"
                  className="member-photo"
                />
              </div>
              <h3>Alassane MARIKO</h3>
              <h4>Ingénieur Logiciel & Business Analyst</h4>
              <p>Je conçois des solutions logicielles efficaces en m’appuyant sur une compréhension fine des besoins métiers et des enjeux fonctionnels.</p>
            </div>
            <div className="team-member fade-in">
              <div className="member-avatar">
                <img 
                  src="/images/bademba.jpg" 
                  alt="Abdoulaye Bademba DIALLO"
                  className="member-photo"
                />
              </div>
              <h3>Abdoulaye Bademba DIALLO</h3>
              <h4>Ing. Réseaux & Sécurité</h4>
              <p>Spécialiste des infrastructures et de la cybersécurité, j’assure la mise en place de réseaux performants et le déploiement de solutions de défense proactive.</p>
            </div>
            <div className="team-member fade-in">
              <div className="member-avatar">
                <img 
                  src="/images/mohamed.jpg" 
                  alt="Mohamed NABE"
                  className="member-photo"
                />
              </div>
              <h3>Mohamed NABE</h3>
              <h4>Ing. DevOps & Administrateur Systèmes</h4>
              <p>J’automatise les processus de déploiement et j’administre des infrastructures systèmes stables, sécurisées et performantes.</p>
            </div>
            
            <div className="team-member fade-in">
              <div className="member-avatar">
                <img 
                  src="https://via.placeholder.com/120x120/0066ff/ffffff?text=JM" 
                  alt="Souleymane DIALLO"
                  className="member-photo"
                />
              </div>
              <h3>Souleymane DIALLO</h3>
              <h4>Développeur Fullstack</h4>
              <p>Je conçois des applications web complètes, du backend à l’interface utilisateur, en alliant performance, sécurité et expérience fluide.</p>

            </div>
            <div className="team-member fade-in">
              <div className="member-avatar">
                <img 
                  src="https://via.placeholder.com/120x120/0066ff/ffffff?text=JM" 
                  alt="Ibrahima BAH"
                  className="member-photo"
                />
              </div>
              <h3>Ibrahima BAH</h3>
              <h4>Développeur Fullstack</h4>
              <p>Spécialisé dans les architectures modernes, je développe des solutions web robustes en intégrant API, bases de données, et interfaces réactives.</p>
            </div>

            <div className="team-member fade-in">
              <div className="member-avatar">
                <img 
                  src="/images/fatoumata.jpg" 
                  alt="Fatoumata SOUARE"
                  className="member-photo"
                />
              </div>
              <h3>Fatoumata SOUARE</h3>
              <h4>Community Manager & UI/UX Designer</h4>
               <p>Je crée des expériences digitales engageantes, en combinant stratégie communautaire et design centré utilisateur. </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-title fade-in">
            <h2>Questions Fréquentes</h2>
            <p>Retrouvez les réponses aux questions les plus courantes</p>
          </div>
          <div className="faq-list">
            {[
              {
                question: 'Quels sont vos tarifs pour un site web ?',
                answer: 'Nos tarifs varient selon la complexité du projet. Un site vitrine commence à partir de 2.500.000 FG, une application web à partir de 5.000.000 FG. Nous proposons toujours un devis personnalisé après analyse de vos besoins.'
              },
              {
                question: 'Combien de temps faut-il pour développer une application ?',
                answer: 'Le délai dépend de la complexité : 2-4 semaines pour un site vitrine, 2-6 mois pour une application web complexe, 3-8 mois pour une application mobile native. Nous respectons scrupuleusement les délais convenus.'
              },
              {
                question: 'Proposez-vous un support après livraison ?',
                answer: 'Oui, nous offrons 3 mois de support gratuit après livraison, puis des contrats de maintenance adaptés. Nous assurons également la formation de vos équipes et la documentation complète.'
              },
              {
                question: 'Travaillez-vous avec des entreprises de toutes tailles ?',
                answer: 'Absolument ! Nous accompagnons aussi bien les startups que les grandes entreprises. Notre approche modulaire nous permet de nous adapter à tous les budgets et besoins.'
              },
              {
                question: 'Vos formations sont-elles certifiantes ?',
                answer: 'Nos formations délivrent des certificats de participation. Nous préparons également aux certifications officielles (AWS, Google Cloud, etc.) selon vos besoins professionnels.'
              }
            ].map((faq, index) => (
              <div key={index} className={`faq-item fade-in ${activeFaq === index ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  {faq.question}
                </div>
                <div className={`faq-answer ${activeFaq === index ? 'active' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Contactez-nous</h2>
              <p>Prêt à démarrer votre projet ? Parlons-en ensemble !</p>
              <div style={{marginTop: '2rem'}}>
                <p><strong>📧 Email:</strong> contact@weenoov.com</p>
                <p><strong>📱 Téléphone:</strong> +224 620 24 26 12 / +336 16 90 87 42</p>
                <p><strong>📍 Adresse:</strong> ManquePas, Immeuble Kébé au 3ème étage, Conakry, Guinée (En cours de rénovation)</p>
                <p><strong>⏰ Horaires:</strong> Lun-Ven 9h-17h30</p>
              </div>
            </div>
            <div className="contact-form">
              <form onSubmit={submitContact}>
                <div className="form-group">
                  <label>Nom</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" required />
                </div>
                <div className="form-group">
                  <label>Sujet</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea required></textarea>
                </div>
                <button type="submit" className="btn-primary">Envoyer le message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>weenoov</h3>
              <p>Votre partenaire technologique pour l'innovation digitale. Nous transformons vos idées en solutions performantes.</p>
            </div>
            <div className="footer-section">
              <h3>Services</h3>
              <p><a href="#services">Développement Web</a></p>
              <p><a href="#services">Applications Mobile</a></p>
              <p><a href="#services">Intelligence Artificielle</a></p>
              <p><a href="#services">Cybersécurité</a></p>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>contact@weenoov.tech</p>
              <p>+224 620 24 26 12 / +336 16 90 87 42</p>
              <p>Conakry, ManquePas, Immeuble Kébé au 3ème étage, Guinée</p>
            </div>
            <div className="footer-section">
              <h3>Suivez-nous</h3>
              <p><a href="#">LinkedIn</a></p>
              <p><a href="#">Twitter</a></p>
              <p><a href="#">GitHub</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 weenoov. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal for Formation Booking */}
      {showContactModal && (
        <div className="modal" style={{display: 'block'}}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>🎓 Demande de réservation - {selectedFormation?.title}</h2>
              <button className="modal-close" onClick={() => setShowContactModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="formation-summary">
                <h4>Détails de la formation :</h4>
                <p><strong>Formation :</strong> {selectedFormation?.title}</p>
                <p><strong>Durée :</strong> {selectedFormation?.duration}</p>
                <p><strong>Prix :</strong> {selectedFormation?.price}</p>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault()
                alert(`Demande de réservation pour "${selectedFormation?.title}" envoyée ! Nous vous contacterons sous 24h pour finaliser votre inscription.`)
                setShowContactModal(false)
              }}>
                <div className="form-group">
                  <label>Nom complet *</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" required />
                </div>
                <div className="form-group">
                  <label>Téléphone *</label>
                  <input type="tel" required />
                </div>
                <div className="form-group">
                  <label>Entreprise</label>
                  <input type="text" />
                </div>
                <div className="form-group">
                  <label>Niveau actuel</label>
                  <select>
                    <option value="">Sélectionnez votre niveau</option>
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="avance">Avancé</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Modalité préférée</label>
                  <select>
                    <option value="">Sélectionnez la modalité</option>
                    <option value="presentiel">Présentiel</option>
                    <option value="distanciel">Distanciel</option>
                    <option value="hybride">Hybride</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message / Besoins spécifiques</label>
                  <textarea placeholder="Décrivez vos objectifs, contraintes ou questions..."></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowContactModal(false)}>Annuler</button>
                  <button type="submit" className="btn-primary">Envoyer la demande</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Service Details */}
      {modalService && (
        <div className="modal" style={{display: 'block'}}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{serviceData[modalService]?.icon} {serviceData[modalService]?.title}</h2>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-tabs">
                <button 
                  className={`modal-tab ${activeTab === 'overview' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('overview')}
                >
                  Vue d'ensemble
                </button>
                <button 
                  className={`modal-tab ${activeTab === 'workflow' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('workflow')}
                >
                  Workflow
                </button>
                {modalService === 'formations' && (
                  <button 
                    className={`modal-tab ${activeTab === 'formations' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('formations')}
                  >
                    Formations
                  </button>
                )}
              </div>
              
              <div className={`tab-content ${activeTab === 'overview' ? 'active' : ''}`}>
                <div dangerouslySetInnerHTML={{__html: serviceData[modalService]?.overview}}></div>
              </div>
              
              <div className={`tab-content ${activeTab === 'workflow' ? 'active' : ''}`}>
                <h3>Processus de développement</h3>
                <div className="workflow-detail">
                  {serviceData[modalService]?.workflow?.map((item, index) => (
                    <div key={index} className="workflow-item">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              

              
              {modalService === 'formations' && (
                <div className={`tab-content ${activeTab === 'formations' ? 'active' : ''}`}>
                  <h3>Formations disponibles</h3>
                  <div className="formation-grid">
                    {serviceData[modalService]?.formations?.map((formation, index) => (
                      <div key={index} className="formation-card">
                        <div className="formation-header">
                          <h4>{formation.title}</h4>
                          <span className="formation-price">{formation.price}</span>
                        </div>
                        <div className="formation-duration">{formation.duration}</div>
                        <ul className="formation-features">
                          {formation.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                        <button 
                          className="btn-primary" 
                          onClick={() => alert(`Demande de réservation pour la formation "${formation.title}" envoyée ! Nous vous contacterons sous 24h pour finaliser votre inscription.`)}
                        >
                          Réserver cette formation
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal" style={{display: 'block'}}>
          <div className="modal-content booking-modal">
            <div className="modal-header">
              <h2>📅 Réserver un appel avec notre équipe</h2>
              <button className="modal-close" onClick={() => setShowBookingModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              {bookingStep === 1 && (
                <div className="booking-step">
                  <h3>📅 Choisissez une date</h3>
                  <div className="calendar">
                    {/* En-têtes des jours de la semaine */}
                    <div className="calendar-header">
                      {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day, index) => (
                        <div key={day} className={`calendar-day-header ${index === 0 || index === 6 ? 'weekend-header' : ''}`}>
                          {day}
                        </div>
                      ))}
                    </div>
                    {/* Calendrier simple */}
                    <div className="calendar-grid">
                      {/* Génération des jours du mois */}
                      {(() => {
                        const today = new Date()
                        const currentMonth = today.getMonth()
                        const currentYear = today.getFullYear()
                        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
                        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
                        const days = []
                        
                        // Jours vides pour aligner le premier jour
                        for (let i = 0; i < firstDayOfMonth; i++) {
                          days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
                        }
                        
                        // Jours du mois
                        for (let day = 1; day <= daysInMonth; day++) {
                          const isToday = day === today.getDate()
                          const isPast = day < today.getDate()
                          const isWeekend = new Date(currentYear, currentMonth, day).getDay() === 0 || new Date(currentYear, currentMonth, day).getDay() === 6
                          
                          days.push(
                            <div 
                              key={day}
                              className={`calendar-day ${
                                isPast ? 'past' : ''
                              } ${
                                isToday ? 'today' : ''
                              } ${
                                isWeekend ? 'weekend' : ''
                              } ${
                                selectedDate === day ? 'selected' : ''
                              }`}
                              onClick={() => {
                                if (!isPast && !isWeekend) {
                                  setSelectedDate(day)
                                  setBookingStep(2)
                                }
                              }}
                            >
                              {day}
                            </div>
                          )
                        }
                        
                        return days
                      })()} 
                    </div>
                    <div className="calendar-legend">
                      <span>Sélectionnez une date disponible (Lun-Ven)</span>
                    </div>
                  </div>
                </div>
              )}
              
              {bookingStep === 2 && (
                <div className="booking-step">
                  <h3>🕐 Choisissez un créneau</h3>
                  <p>Date sélectionnée : {selectedDate} {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                  <div className="time-slots">
                    {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                      <button 
                        key={time}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedTime(time)
                          setBookingStep(3)
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <button className="btn-secondary" onClick={() => setBookingStep(1)}>← Retour</button>
                </div>
              )}
              
              {bookingStep === 3 && (
                <div className="booking-step">
                  <h3>📋 Informations de contact</h3>
                  <div className="booking-summary">
                    <p><strong>📅 Date :</strong> {selectedDate} {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                    <p><strong>🕐 Heure :</strong> {selectedTime}</p>
                  </div>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    alert('Rendez-vous confirmé ! Nous vous enverrons une invitation par email.')
                    setShowBookingModal(false)
                    setBookingStep(1)
                    setSelectedDate(null)
                    setSelectedTime(null)
                  }}>
                    <div className="form-group">
                      <label>Nom complet *</label>
                      <input 
                        type="text" 
                        required 
                        value={bookingData.name}
                        onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email *</label>
                      <input 
                        type="email" 
                        required 
                        value={bookingData.email}
                        onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email(s) pour invité(s) (optionnel)</label>
                      <input 
                        type="text" 
                        placeholder="invites@exemple.com, autre@exemple.com"
                        value={bookingData.guestEmails}
                        onChange={(e) => setBookingData({...bookingData, guestEmails: e.target.value})}
                      />
                      <small style={{color: '#666', fontSize: '0.8rem'}}>Séparez plusieurs emails par des virgules</small>
                    </div>
                    
                    <div className="form-group">
                      <label>Type de réunion *</label>
                      <div className="radio-group">
                        <label className="radio-option">
                          <input 
                            type="radio" 
                            name="meetingType" 
                            value="google-meet"
                            checked={bookingData.meetingType === 'google-meet'}
                            onChange={(e) => setBookingData({...bookingData, meetingType: e.target.value})}
                          />
                          <span>🎥 Google Meet</span>
                        </label>
                        <label className="radio-option">
                          <input 
                            type="radio" 
                            name="meetingType" 
                            value="phone-call"
                            checked={bookingData.meetingType === 'phone-call'}
                            onChange={(e) => setBookingData({...bookingData, meetingType: e.target.value})}
                          />
                          <span>📞 Appel téléphonique</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Veuillez partager tout ce qui pourra être utile à la préparation de notre réunion</label>
                      <textarea 
                        rows="4"
                        placeholder="Décrivez votre projet, vos besoins, vos objectifs, ou toute information qui nous aiderait à préparer au mieux cette réunion..."
                        value={bookingData.notes}
                        onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                      ></textarea>
                    </div>
                    
                    <div className="form-actions">
                      <button type="button" className="btn-secondary" onClick={() => setBookingStep(2)}>← Retour</button>
                      <button type="submit" className="btn-primary">✅ Confirmer le rendez-vous</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings */}
      {showCookieSettings && (
        <div className="cookie-settings visible">
          <div className="cookie-settings-content">
            <div className="cookie-text">
              <div className="cookie-title">🍪 Gestion des cookies</div>
              <div className="cookie-description">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                Vous pouvez choisir quels cookies accepter.
              </div>
            </div>
            <div className="cookie-actions">
              <button 
                className="cookie-btn cookie-btn-reject"
                onClick={handleRejectAllCookies}
              >
                Tout refuser
              </button>
              <button 
                className="cookie-btn cookie-btn-customize"
                onClick={handleCustomizeCookies}
              >
                Personnaliser
              </button>
              <button 
                className="cookie-btn cookie-btn-accept"
                onClick={handleAcceptAllCookies}
              >
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Customization Modal */}
      {showCookieModal && (
        <div className="cookie-modal">
          <div className="cookie-modal-content">
            <div className="cookie-modal-header">
              <h3 className="cookie-modal-title">🍪 Paramètres des cookies</h3>
              <button 
                className="cookie-modal-close"
                onClick={() => setShowCookieModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="cookie-category">
              <div className="cookie-category-header">
                <h4 className="cookie-category-title">Cookies nécessaires</h4>
                <div className="cookie-toggle active">
                  <div className="cookie-toggle-slider"></div>
                </div>
              </div>
              <div className="cookie-category-description">
                Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.
              </div>
              <div className="cookie-category-details">
                • Mémorisation de vos préférences de cookies<br/>
                • Sécurité et authentification<br/>
                • Fonctionnalités de base du site
              </div>
            </div>

            <div className="cookie-category">
              <div className="cookie-category-header">
                <h4 className="cookie-category-title">Cookies d'analyse</h4>
                <div 
                  className={`cookie-toggle ${cookiePreferences.analytics ? 'active' : ''}`}
                  onClick={() => toggleCookieCategory('analytics')}
                >
                  <div className="cookie-toggle-slider"></div>
                </div>
              </div>
              <div className="cookie-category-description">
                Ces cookies nous aident à comprendre comment vous utilisez notre site.
              </div>
              <div className="cookie-category-details">
                • Statistiques de visite<br/>
                • Pages les plus consultées<br/>
                • Temps passé sur le site
              </div>
            </div>

            <div className="cookie-category">
              <div className="cookie-category-header">
                <h4 className="cookie-category-title">Cookies marketing</h4>
                <div 
                  className={`cookie-toggle ${cookiePreferences.marketing ? 'active' : ''}`}
                  onClick={() => toggleCookieCategory('marketing')}
                >
                  <div className="cookie-toggle-slider"></div>
                </div>
              </div>
              <div className="cookie-category-description">
                Ces cookies permettent d'afficher des publicités personnalisées.
              </div>
              <div className="cookie-category-details">
                • Publicités ciblées<br/>
                • Suivi des conversions<br/>
                • Personnalisation des offres
              </div>
            </div>

            <div className="cookie-category">
              <div className="cookie-category-header">
                <h4 className="cookie-category-title">Cookies de préférences</h4>
                <div 
                  className={`cookie-toggle ${cookiePreferences.preferences ? 'active' : ''}`}
                  onClick={() => toggleCookieCategory('preferences')}
                >
                  <div className="cookie-toggle-slider"></div>
                </div>
              </div>
              <div className="cookie-category-description">
                Ces cookies mémorisent vos choix pour personnaliser votre expérience.
              </div>
              <div className="cookie-category-details">
                • Thème sombre/clair<br/>
                • Langue préférée<br/>
                • Paramètres d'affichage
              </div>
            </div>

            <div className="cookie-modal-actions">
              <button 
                className="cookie-modal-btn cookie-modal-btn-secondary"
                onClick={() => setShowCookieModal(false)}
              >
                Annuler
              </button>
              <button 
                className="cookie-modal-btn cookie-modal-btn-primary"
                onClick={handleSaveCookiePreferences}
              >
                Sauvegarder mes préférences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Remonter en haut de la page"
      >
        ↑
      </button>
    </div>
  )
}

export default App
