const MobileOverlay = () => (
    <div className="fixed inset-0 lg:hidden flex flex-col items-center justify-center z-[9999] select-none"
        style={{
            backgroundImage: "url('/images/test.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Dialog macOS style */}
        <div className="relative z-10 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 mx-6 max-w-sm text-center">
            <img src="/images/logo.svg" alt="logo" className="w-12 mx-auto mb-4" />

            <h1 className="text-lg font-bold text-gray-800 mb-2">
                Portfolio non optimisé
            </h1>

            <p className="text-sm text-gray-500 leading-relaxed">
                Ce portfolio est conçu pour être expérimenté sur un <strong className="text-gray-700">écran d'ordinateur</strong>.
                <br /><br />
                Veuillez l'ouvrir depuis un Mac ou un PC pour profiter de l'expérience complète.
            </p>

            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                <span className="ml-2">Bruno Zilio — Portfolio 2026</span>
            </div>
        </div>
    </div>
);

export default MobileOverlay;
