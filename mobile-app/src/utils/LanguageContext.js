

// src/utils/languageContexte.js
import React, { createContext, useState } from 'react';

// إنشاء Context
export const LanguageContext = createContext();

// الترجمات
export const translations = {
  en: {
    loginTitle: 'The BTS Networks',
    loginSubtitle: 'Higher Technician Certificate',
    gmailPlaceholder: 'Gmail',
    passwordPlaceholder: 'Password',
    connect: 'Connect',
    noAccountText: "Don't have an account?",
    createAccount: "Create an account",
    personalInfo: "Personal information & verification",
    firstName: "First name",
    firstNamePlaceholder: "Enter your first name",
    lastName: "Last name",
    lastNamePlaceholder: "Enter your last name",
    pathCode: "Path code",
    email: "Email",
    validate: "Validate",
    code: "Code",
    confirmCode: "Confirm Code",
    registrationComplete: "Registration complete!",
    infoValid: "Your information is valid",
    infoInvalid: "Your information is incorrect. Want help?",
    help: "Help",
    helpTitle: 'Help about BTS',
    helpBlocks: {
      btsFes: {
        title: 'BTS in Fès',
        text: 'The Higher Technician Certificate (BTS) is a national higher education diploma prepared in two years after the baccalaureate. It provides professional training in various fields.'
      },
      inscription: {
        title: "How to enroll in BTS",
        text: `1. Obtain the baccalaureate with minimum pass grade
2. Fill the online pre-registration form
3. Choose up to 3 tracks
4. Submit required documents
5. Wait for pre-selection results
6. Pass interview or admission test
7. Finalize registration`
      },
      filieres: {
        title: "Main tracks",
        text: `DAI: IT development
EII: Electronics & Industrial IT
CG: Accounting & Management
TC: Technical & Commercial`
      },
      objectives: {
        title: "Objectives",
        text: "Train competent technicians to meet market needs."
      },
      advice: {
        title: "Tips to succeed",
        text: "Plan your studies, participate actively, practice regularly."
      },
    },
    registerTitle:"Register",
    chooseBts:"Choose BTS type",
    enterInfo:"Enter your information",
    massar:"Massar code",
    massarPlaceholder:"Enter your Massar code",
    filiere:"Filière",
    birthDate:"Birth date",
    birthDatePlaceholder:"YYYY-MM-DD",
    schoolYear:"School year",
    firstYear:"First year",
    secondYear:"Second year",
    btsLibre:"Free BTS",
    btsConnected:"Connected BTS",
    verifyContinue:"Verify & Continue",
    back:"Back",
    success:"Success",
    error:"Error",
    noVerification:"No verification needed for Free BTS",
    verificationSuccess:"Student verified successfully",
    incorrectInfo:"Incorrect information",
    serverProblem:"Server problem. Try again later.",
    // جديد للتقارير
    reportProblem: "Have a problem? Report",
    reportTitle: "Report a problem",
    reportPlaceholder: "Describe your issue...",
    sendReport: "Send",
    reportSentMessage: "We will contact you as soon as possible",
    forgotPasswordTitle: "Forgot password",
    forgotPasswordSubtitle: "Verify your information to receive your account details.",
    forgotPasswordSent: "Your account information has been sent to your registered email.",
    fillAllFields: "Fill all fields",
    sending: "Sending...",
    forgotPasswordTitle: "Forgot password",
forgotPasswordSubtitle: "Verify your information to receive your account details.",
forgotPasswordSent: "Your account information has been sent.",
fillAllFields: "Fill all fields",
sending: "Sending...",
fillAllFields: "Fill all fields",
codesDoNotMatch: "Codes do not match",
homeWelcome: "Welcome",
homeSubtitle: "Quick access to your BTS space",
homeFilieres: "BTS Tracks",
homeServices: "Services",
homeAi: "AI",
homeLessons: "Lessons",
homeCommunication: "Communication",
homePosts: "Posts",
homeCardTitle: "BTS Network",
homeCardText: "Explore your lessons, messages, publications and smart tools in one clean and modern space.",
homeMain: "Home",
    forgotPassword: "Forgot password?"
  },

  fr: {
    loginTitle: 'The BTS Networks',
    loginSubtitle: 'Brevet de Technicien Supérieur',
    gmailPlaceholder: 'Gmail',
    passwordPlaceholder: 'Mot de passe',
    connect: 'Connecter',
    noAccountText: "Vous n'avez pas compte ?",
    createAccount: "Créer un compte",
    personalInfo: "Information personnelle et vérification",
    firstName: "Prénom",
    firstNamePlaceholder:"Entrez votre prénom",
    lastName: "Nom de famille",
    lastNamePlaceholder:"Entrez votre nom",
    pathCode: "Code parcours",
    email: "Email",
    validate: "Valider",
    code: "Code",
    confirmCode: "Confirmer le code",
    registrationComplete: "Inscription terminée !",
    infoValid: "Votre information validée",
    infoInvalid: "Vos informations sont incorrectes. Voulez-vous de l'aide ?",
    help: "Aide",
    helpTitle: 'Aide à propos du BTS',
    helpBlocks: {
      btsFes: {
        title: 'Le BTS à Fès',
        text: "Le Brevet de Technicien Supérieur (BTS) est un diplôme national d'enseignement supérieur qui se prépare en deux ans après le baccalauréat. Il offre une formation professionnelle de qualité dans divers domaines."
      },
      inscription: {
        title: "Comment s'inscrire au BTS",
        text: `1. Obtenir le baccalauréat avec mention passable minimum
2. Remplir le dossier de préinscription en ligne
3. Choisir jusqu'à 3 filières
4. Soumettre les documents requis
5. Attendre les résultats
6. Passer l'entretien ou test d'admission
7. Finaliser l'inscription`
      },
      filieres: {
        title: "Les filières principales",
        text: `DAI : Développement des applications informatiques
EII : Électronique et informatique industrielle
CG : Comptabilité et gestion
TC : Technico-commerciale`
      },
      objectives: {
        title: "Objectifs du BTS",
        text: "Former des techniciens compétents capables de répondre aux besoins du marché."
      },
      advice: {
        title: "Conseils pour réussir",
        text: "Planifiez vos études, participez activement et pratiquez régulièrement."
      },
    },
    registerTitle:"Inscription",
    chooseBts:"Choisir type BTS",
    enterInfo:"Entrez vos informations",
    massar:"Code Massar",
    massarPlaceholder:"Entrez votre code Massar",
    filiere:"Filière",
    birthDate:"Date de naissance",
    birthDatePlaceholder:"AAAA-MM-JJ",
    schoolYear:"Année scolaire",
    firstYear:"Première année",
    secondYear:"Deuxième année",
    btsLibre:"BTS libre",
    btsConnected:"BTS connecté",
    verifyContinue:"Vérifier & Continuer",
    back:"Retour",
    success:"Succès",
    error:"Erreur",
    noVerification:"Pas de vérification pour BTS libre",
    verificationSuccess:"Étudiant vérifié avec succès",
    incorrectInfo:"Informations incorrectes",
    serverProblem:"Problème du serveur. Réessayez plus tard.",
    // جديد للتقارير
    reportProblem: "Avez-vous un problème ? Signaler",
    reportTitle: "Signaler un problème",
    reportPlaceholder: "Décrivez votre problème...",
    sendReport: "Envoyer",
    reportSentMessage: "Nous vous contacterons dans les plus brefs délais",
    forgotPasswordTitle: "Mot de passe oublié",
    forgotPasswordSubtitle: "Vérifiez vos informations pour recevoir les détails de votre compte.",
    forgotPasswordSent: "Les informations de votre compte ont été envoyées à votre email enregistré.",
    fillAllFields: "Remplissez tous les champs",
    sending: "Envoi...",
    forgotPasswordTitle: "Mot de passe oublié",
forgotPasswordSubtitle: "Vérifiez vos informations pour recevoir les détails de votre compte.",
forgotPasswordSent: "Les informations de votre compte ont été envoyées.",
fillAllFields: "Remplissez tous les champs",
sending: "Envoi...",
fillAllFields: "Remplissez tous les champs",
codesDoNotMatch: "Les codes ne correspondent pas",
homeWelcome: "Bienvenue",
homeSubtitle: "Accédez rapidement à votre espace BTS",
homeFilieres: "Filières BTS",
homeServices: "Services",
homeAi: "AI",
homeLessons: "Lessons",
homeCommunication: "Communication",
homePosts: "Posts",
homeCardTitle: "BTS Network",
homeCardText: "Explorez vos leçons, messages, publications et outils intelligents dans un espace moderne et élégant.",
homeMain: "Home",
    forgotPassword: "Mot de passe oublié ?"
  },

  ar: {
    loginTitle: 'شبكة BTS',
    loginSubtitle: 'شهادة التقني المتخصص',
    gmailPlaceholder: 'البريد الإلكتروني',
    passwordPlaceholder: 'كلمة المرور',
    connect: 'اتصال',
    noAccountText: "لا تملك حساب؟",
    createAccount: "إنشاء حساب",
    personalInfo: "المعلومات الشخصية والتحقق",
    firstName: "الاسم الأول",
    firstNamePlaceholder:"أدخل الاسم الأول",
    lastName: "الاسم العائلي",
    lastNamePlaceholder:"أدخل الاسم العائلي",
    pathCode: "كود المسار",
    email: "البريد الإلكتروني",
    validate: "تأكيد",
    code: "الكود",
    confirmCode: "تأكيد الكود",
    registrationComplete: "تم إتمام التسجيل!",
    infoValid: "معلوماتك صحيحة",
    infoInvalid: "معلوماتك خاطئة. هل تريد المساعدة؟",
    help: "مساعدة",
    helpTitle: 'مساعدة حول BTS',
    helpBlocks: {
      btsFes: {
        title: 'BTS في فاس',
        text: 'شهادة التقني المتخصص (BTS) هي دبلوم وطني للتعليم العالي يُحضّر في عامين بعد البكالوريا. يوفر تكوينًا مهنيًا في مجالات مختلفة.'
      },
      inscription: {
        title: "كيفية التسجيل في BTS",
        text: `1. الحصول على البكالوريا بميزة مقبولة
2. ملء استمارة التسجيل المسبق عبر الإنترنت
3. اختيار حتى 3 تخصصات
4. تقديم الوثائق المطلوبة
5. انتظار نتائج القبول المسبق
6. اجتياز المقابلة أو اختبار القبول
7. إتمام التسجيل`
      },
      filieres: {
        title: "التخصصات الرئيسية",
        text: `DAI: تطوير التطبيقات المعلوماتية
EII: الإلكترونيات والمعلوماتية الصناعية
CG: المحاسبة والإدارة
TC: تقني-تجاري`
      },
      objectives: {
        title: "الأهداف",
        text: "تكوين تقنيين مؤهلين لتلبية احتياجات السوق."
      },
      advice: {
        title: "نصائح للنجاح",
        text: "خطط لدراستك، شارك بنشاط وتمرن بانتظام."
      },
    },
    registerTitle:"التسجيل",
    chooseBts:"اختر نوع BTS",
    enterInfo:"أدخل معلوماتك",
    massar:"كود مسار",
    massarPlaceholder:"أدخل كود المسار",
    filiere:"الشعبة",
    birthDate:"تاريخ الازدياد",
    birthDatePlaceholder:"YYYY-MM-DD",
    schoolYear:"السنة الدراسية",
    firstYear:"السنة الأولى",
    secondYear:"السنة الثانية",
    btsLibre:"BTS حر",
    btsConnected:"BTS مرتبط",
    verifyContinue:"تحقق وواصل",
    back:"رجوع",
    success:"نجاح",
    error:"خطأ",
    noVerification:"لا حاجة للتحقق بالنسبة لـ BTS حر",
    verificationSuccess:"تم التحقق من الطالب بنجاح",
    incorrectInfo:"معلومات خاطئة",
    serverProblem:"مشكلة في الخادم. حاول لاحقًا.",
    // جديد للتقارير
    reportProblem: "هل لديك مشكلة؟ قم بالإبلاغ",
    reportTitle: "الإبلاغ عن مشكلة",
    reportPlaceholder: "اشرح مشكلتك...",
    sendReport: "إرسال",
    forgotPassword: "نسيت كلمة المرور؟",
    forgotPasswordTitle: "نسيت كلمة المرور",
    forgotPasswordSubtitle: "تحقق من معلوماتك للتوصل بتفاصيل حسابك.",
    forgotPasswordSent: "تم إرسال معلومات حسابك إلى بريدك الإلكتروني المسجل.",
    fillAllFields: "املأ جميع الخانات",
    sending: "جاري الإرسال...",
    forgotPasswordTitle: "نسيت كلمة المرور",
forgotPasswordSubtitle: "تحقق من معلوماتك للتوصل بتفاصيل حسابك.",
forgotPasswordSent: "تم إرسال معلومات حسابك.",
fillAllFields: "املأ جميع الخانات",
sending: "جاري الإرسال...",
fillAllFields: "املأ جميع الخانات",
codesDoNotMatch: "الكودان غير متطابقين",
homeWelcome: "مرحبا",
homeSubtitle: "ولوج سريع إلى فضاء BTS الخاص بك",
homeFilieres: "شعب BTS",
homeServices: "الخدمات",
homeAi: "الذكاء الاصطناعي",
homeLessons: "الدروس",
homeCommunication: "التواصل",
homePosts: "المنشورات",
homeCardTitle: "BTS Network",
homeCardText: "استكشف دروسك ورسائلك ومنشوراتك والأدوات الذكية في فضاء حديث وأنيق.",
homeMain: "الرئيسية",
    reportSentMessage: "سيتم التواصل معكم في أقرب وقت"
  }
};

// Provider
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};