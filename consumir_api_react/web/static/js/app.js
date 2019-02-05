import "phoenix_html"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class HelloReact extends React.Component {
  render() {
    return (
      <Router>
         <div>
           <Route exact path="/" component={Home}/>
           <Route path="/list" component={List} />
         </div>
     </Router>
    )
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <div class="row">
          <div class="col s12 m6">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Test</span>
                <p>Esto es una prueba</p>
              </div>
              <div class="card-action">
                <Link className="btn " to="/list">Ir a la lista de productos</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class List extends React.Component {

  constructor() {
      super();
      this.state = {
        products: []
      }
    }

  componentDidMount() {
     this.getProducts();
   }

  getProducts() {
    fetch('/products')
      .then(res => res.json())
      .then(data => {
        this.setState({products: data.data});
        console.log(this.state.products);
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <table className= "col m8 offset-m2 striped">
            <thead>
              <tr>
                  <th>Estado</th>
                  <th>Producto</th>
                  <th>Tienda</th>
                  <th>Dirección</th>
                  <th>Precio</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.products.map(product => {
                      return (
                        <tr key={product.id}>
                          <td> {product.estado} </td>
                          <td>{product.producto}</td>
                          <td>{product.tienda}</td>
                          <td>{product.direccion}</td>
                          <td>{product.precio}</td>
                        </tr>
                      )
                    })
                  }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <HelloReact/>,
  document.getElementById("hello-react")
)
