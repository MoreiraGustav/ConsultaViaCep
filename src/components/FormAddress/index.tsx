"use client";
import axios from "axios";
import { useState } from "react";

export default function FormAddress() {
  const [cep, setCep] = useState<string>("");
  const [address, setAddress] = useState<any>(null);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value);
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <div className="flex flex-col justify-center items-center">
        <label>CEP:</label>
        <input className=" rounded-md w-48 h-10 px-2 mt-2" type="text" value={cep} onChange={handleCepChange} maxLength={8} />
        <button className="mt-5 w-40 h-16 bg-gray-400 rounded-md" onClick={fetchAddress}>Buscar Endereço</button>
      </div>

      {address && (
        <div className="pt-10">
          <h2 className="text-center mb-2">Endereço Encontrado</h2>
          <p>CEP: {address.cep}</p>
          <p>Logradouro: {address.logradouro}</p>
          <p>Bairro: {address.bairro}</p>
          <p>Cidade: {address.localidade}</p>
          <p>Estado: {address.uf}</p>
          <p>IBGE: {address.ibge}</p>
        </div>
      )}
    </div>
  );
}
