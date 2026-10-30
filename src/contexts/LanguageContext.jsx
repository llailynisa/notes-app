import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANGUAGE_STORAGE_KEY = 'language';
const LanguageContext = createContext(null);

const translations = {
  id: {
    appName: 'Aplikasi Catatan',
    notes: 'Catatan',
    archives: 'Arsip',
    add: 'Tambah',
    logout: 'Keluar',
    login: 'Masuk',
    register: 'Daftar',
    email: 'Email',
    password: 'Password',
    name: 'Nama',
    fullName: 'Nama lengkap',
    minPassword: 'Minimal 6 karakter',
    confirmPassword: 'Konfirmasi Password',
    repeatPassword: 'Ulangi password',
    noAccount: 'Belum punya akun?',
    haveAccount: 'Sudah punya akun?',
    registerHere: 'Daftar di sini',
    loginHere: 'Masuk di sini',
    processing: 'Memproses...',
    passwordTooShort: 'Password minimal 6 karakter.',
    passwordMismatch: 'Konfirmasi password tidak sama dengan password.',
    activeNotes: 'Catatan Aktif',
    archivedNotes: 'Catatan Arsip',
    loadingSession: 'Memeriksa sesi...',
    loadingNotes: 'Memuat catatan...',
    loadingArchives: 'Memuat catatan arsip...',
    loadingDetail: 'Memuat detail catatan...',
    save: 'Simpan',
    saving: 'Menyimpan...',
    title: 'Judul',
    noteBody: 'Catatan',
    titlePlaceholder: 'Judul catatan',
    bodyPlaceholder: 'Tulis catatanmu...',
    searchPlaceholder: 'Cari judul...',
    emptyNotes: 'Belum ada catatan.',
    emptyArchives: 'Belum ada catatan arsip.',
    notFound: 'Halaman tidak ditemukan',
    backHome: 'Kembali ke Halaman Utama',
    archive: 'Arsipkan',
    unarchive: 'Pindahkan',
    delete: 'Hapus',
    changeToLight: 'Ubah ke tema terang',
    changeToDark: 'Ubah ke tema gelap',
    changeToEnglish: 'Switch language to English',
    changeToIndonesian: 'Ganti bahasa ke Indonesia',
  },
  en: {
    appName: 'Notes App',
    notes: 'Notes',
    archives: 'Archives',
    add: 'Add',
    logout: 'Log out',
    login: 'Log in',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    fullName: 'Full name',
    minPassword: 'At least 6 characters',
    confirmPassword: 'Confirm password',
    repeatPassword: 'Repeat password',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    registerHere: 'Register here',
    loginHere: 'Log in here',
    processing: 'Processing...',
    passwordTooShort: 'Password must be at least 6 characters.',
    passwordMismatch: 'Password confirmation does not match.',
    activeNotes: 'Active Notes',
    archivedNotes: 'Archived Notes',
    loadingSession: 'Checking session...',
    loadingNotes: 'Loading notes...',
    loadingArchives: 'Loading archived notes...',
    loadingDetail: 'Loading note details...',
    save: 'Save',
    saving: 'Saving...',
    title: 'Title',
    noteBody: 'Note',
    titlePlaceholder: 'Note title',
    bodyPlaceholder: 'Write your note...',
    searchPlaceholder: 'Search titles...',
    emptyNotes: 'No notes yet.',
    emptyArchives: 'No archived notes.',
    notFound: 'Page not found',
    backHome: 'Back to Home',
    archive: 'Archive',
    unarchive: 'Unarchive',
    delete: 'Delete',
    changeToLight: 'Switch to light theme',
    changeToDark: 'Switch to dark theme',
    changeToEnglish: 'Switch language to English',
    changeToIndonesian: 'Switch language to Indonesian',
  },
};

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return savedLanguage === 'en' || savedLanguage === 'id' ? savedLanguage : 'id';
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  function toggleLanguage() {
    setLanguage((currentLanguage) => currentLanguage === 'id' ? 'en' : 'id');
  }

  const contextValue = useMemo(
    () => ({
      language,
      toggleLanguage,
      t: (key) => translations[language][key] || key,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}

export { LanguageProvider, useLanguage };
