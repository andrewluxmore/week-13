import React, { useMemo, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { MOVIES } from './movies'

function Layout({ children }){
  return (
    <div className="container py-3">
      <nav className="navbar navbar-expand bg-light rounded mb-3 px-3">
        <Link className="navbar-brand" to="/">Bond SPA</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/movies">Movies</Link>
        </div>
      </nav>
      {children}
    </div>
  )
}

function Home(){
  return (
    <div className="p-4 bg-light rounded">
      <h2>Week 13 – Deploy to GitHub Pages</h2>
      <p>Fallback route and empty-state UX implemented. Ready to deploy.</p>
    </div>
  )
}

function Movies(){
  const [q, setQ] = useState('')
  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    return term ? MOVIES.filter(m => m.title.toLowerCase().includes(term)) : MOVIES
  }, [q])

  return (
    <div>
      <h2>Movies</h2>
      <input aria-label="Search titles" className="form-control mb-3" placeholder="Search title..." value={q} onChange={e=>setQ(e.target.value)} />
      {results.length === 0 ? (
        <div role="status" className="alert alert-info">
          No results for <strong>{q}</strong>. Try another title or <button className="btn btn-sm btn-outline-secondary ms-2" onClick={()=>setQ('')}>clear search</button>.
        </div>
      ) : (
        <ul className="list-group">
          {results.map(m => <li key={m.id} className="list-group-item">{m.title} ({m.year}) — {m.actor}</li>)}
        </ul>
      )}
    </div>
  )
}

function NotFound(){
  return (
    <div className="text-center p-5">
      <h2>404 – Not Found</h2>
      <p className="text-muted">This page does not exist.</p>
      <Link to="/" className="btn btn-primary mt-3">Go Home</Link>
    </div>
  )
}

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Layout>
  )
}
