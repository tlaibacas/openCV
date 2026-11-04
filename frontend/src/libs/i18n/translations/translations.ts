import type { Translations } from "@/types/types";
type DualTranslations = {
  first: Translations;
  second: Translations;
};

const loading: Translations = {
  pt: "A carregar...",
  es: "Cargando...",
  en: "Loading...",
  fr: "Chargement...",
};

const dialog: DualTranslations = {
  first: {
    pt: "O seu idioma guardado difere do idioma atual da página.",
    es: "Su idioma guardado difiere del idioma actual de la página.",
    en: "Your saved language differs from the current page language.",
    fr: "Votre langue enregistrée diffère de la langue actuelle de la page.",
  },
  second: {
    pt: "Deseja continuar ou ir para o seu idioma preferido?",
    es: "¿Desea continuar o ir a su idioma preferido?",
    en: "Would you like to continue or go to your preferred language?",
    fr: "Voulez-vous continuer ou aller à votre langue préférée?",
  },
};

const dontWarn: Translations = {
  pt: "Não me avise novamente",
  es: "No me vuelvas a avisar",
  en: "Don't warn me again",
  fr: "Ne plus m'avertir",
};

const goTo: Translations = {
  pt: "Ir para",
  es: "Ir a",
  en: "Go to",
  fr: "Aller à",
};

const continueText: Translations = {
  pt: "Continuar",
  es: "Continuar",
  en: "Continue",
  fr: "Continuer",
};

const remember: DualTranslations = {
  first: {
    pt: "Sim",
    es: "Sí",
    en: "Yes",
    fr: "Oui",
  },
  second: {
    pt: "Não",
    es: "No",
    en: "No",
    fr: "Non",
  },
};

const AllRightsReserved: Translations = {
  pt: "Todos os direitos reservados.",
  es: "Todos los derechos reservados.",
  en: "All rights reserved.",
  fr: "Tous droits réservés.",
};

export {
  loading,
  dialog,
  dontWarn,
  goTo,
  continueText,
  remember,
  AllRightsReserved,
};
