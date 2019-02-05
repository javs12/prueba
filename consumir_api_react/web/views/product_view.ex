defmodule ConsumirApiReact.ProductView do
  use ConsumirApiReact.Web, :view

  def render("index.json", %{products: products}) do
        %{data: render_many(products, ConsumirApiReact.ProductView, "product.json")}
  end

  def render("product.json", %{product: product}) do
      %{
          id: product["_id"],
          producto: product["producto"],
          tienda: product["cadenaComercial"],
          estado: product["estado"],
          precio: product["precio"],
          direccion: product["direccion"]
      }
  end

end
