export default function LoadingSpinner() {
  return (
    <div className="app-shell flex items-center justify-center px-4">
      <div className="surface-card w-full max-w-sm p-8 text-center">
        <div className="mx-auto mb-4 h-14 w-14 animate-spin rounded-full border-4 border-soft-mcm-sage/30 border-t-soft-mcm-sage" />
        <p className="text-soft-mcm-light font-semibold">Loading your dashboard...</p>
        <p className="text-soft-mcm-gray text-sm mt-1">Preparing the latest data securely</p>
      </div>
    </div>
  );
}
