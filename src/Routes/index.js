import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Admin from '../Pages/Admin';
import Private from './Private';
import Mensagens from '../Pages/Mensagens';
import FolhaPagamento from '../Pages/Folha_Pagamento';
import ControlePonto from '../Pages/Controle_Ponto';

function RoutesApp()
{
    return(

        <Routes>
            <Route path='/'element= { <Home/> }/>
            <Route path='/inicio'element= { <Private><Admin/></Private> }/>
            <Route path='/mensagens' element={<Private><Mensagens/></Private>}/>
            <Route path='/folha_pagamento' element={<Private><FolhaPagamento/></Private>}/>
            <Route path='/controle_ponto' element={<Private><ControlePonto/></Private>}/>
           <Route path='/mobile-download' Component={()=>{
               window.open('https://drive.google.com/drive/folders/1MGfjwhhUrkO_OxcLgwfucJ-VgDpRopht?usp=sharing', '_blank');
               window.location.replace('/inicio')
               return null;
           }}/>
           <Route path='/desktop-download' Component={()=>{
            window.open('https://drive.google.com/','_blank');
            window.location.replace('/inicio')
            return null;
           }}/>
        </Routes>
    )
}

export default RoutesApp;