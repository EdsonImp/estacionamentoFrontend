import { useContext } from "react";
import { AuthContext } from "./Auth";

//cria um contexto e pega o autocontexto criado em auth e retorna ele para todos quqe quizerem usar
const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuth;
