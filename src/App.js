import React, { Component } from 'react'
import NameChange from './Namechanger/NameChange'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuItem from './MenuItem'
import Components from './class-vs-function/components'
import Likeapp from './Likeapp/Likeapp'
import Index from './plusminus/Index'
import Api from './Datafetching/Api'
import Crud from './crud/Crud'
export default class App extends Component {
  render() {
    return (

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<MenuItem />} />
          <Route path='/components' element={<Components />} />
          <Route path='/namechanger' element={<NameChange />} />
          <Route path='/likeapp' element={<Likeapp />} />
          <Route path='/plusminus' element={<Index />} />
          <Route path='/api' element={<Api />} />
          <Route path='/crud' element={<Crud />} />



        </Routes>

      </BrowserRouter>
    )
  }
}
