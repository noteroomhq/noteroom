const AuthButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
  >
    {label}
  </button>
);

export default AuthButton;
