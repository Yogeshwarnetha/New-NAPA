import logoMain from "../../Images/logo-main.png";

interface LogoLoaderProps {
  label?: string;
}

const LogoLoader = ({ label = "Loading..." }: LogoLoaderProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <img
          src={logoMain}
          alt="NAPA Logo"
          className="h-24 w-auto animate-pulse"
        />
        <div className="h-2 w-40 overflow-hidden rounded bg-gray-200">
          <div className="h-full w-full logo-loader-bar" />
        </div>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default LogoLoader;
