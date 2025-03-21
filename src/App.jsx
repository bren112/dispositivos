import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from "./pages/Home/Home";
import CadastroDep from "./pages/Cadastro/Cadastro";
import Escolhido from "./pages/Setores/Escolhido";
import CadastroMaqs from "./pages/Setores/Cadastro/CadastroMaqs";
import All from "./pages/Setores/All/All";
import Impressora from "./pages/Setores/Impressora/Impressora";
import Computador from "./pages/Setores/Computadores/Computador";
import Celular from "./pages/Setores/Celular/Celular";
import Notebook from "./pages/Setores/Notebook/Notebook";
import Radio from "./pages/Setores/Radio/Radio";
function App() {
  return (
    <BrowserRouter>
      <div id="root">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastrodep" element={<CadastroDep />} />
            <Route path="/departamento/:id" element={<Escolhido />} />
            <Route path="/cadastromaq" element={<CadastroMaqs />} />
            <Route path="/all" element={<All />} />
            <Route path="/impressora" element={<Impressora />} />
            <Route path="/computador" element={<Computador />} />
            <Route path="/celular" element={<Celular />} />
            <Route path="/notebook" element={<Notebook />} />
            <Route path="/radio" element={<Radio />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
