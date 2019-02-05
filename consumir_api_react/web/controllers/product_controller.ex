defmodule ConsumirApiReact.ProductController do
  use ConsumirApiReact.Web, :controller

  def index(conn, _params) do
    products = principal()
    render(conn, "index.json", products: products)
  end

  def list(conn, _params) do
    blogs = principal()
  end

  def principal do
    HTTPotion.start
    request("https://api.datos.gob.mx/v1/profeco.precios/")
    |> body
    |> parse_body_to_tuple
    |> get_list_per_tuple
    |> get_map_to_list
    |> get_list_per_tupleResult
    |> filterList_and_sortPrice

  end

  defp request(url) do
    HTTPotion.get url
  end

  defp body(response) do
    response.body
  end

  defp parse_body_to_tuple(body) do
    Poison.Parser.parse body
  end

  defp get_list_per_tuple(tuple) do
    elem(tuple,1)
  end

  defp get_map_to_list(list) do
    list |> Enum.at(1)
  end

  defp get_list_per_tupleResult(tuple) do
    elem(tuple,1)
  end

  defp filterList_and_sortPrice(list) do
    lst = Enum.filter(list, fn f -> f["estado"] == "DISTRITO FEDERAL" && f["producto"] == "TORTILLA DE MAIZ" end)
    Enum.sort_by(lst, fn(l) -> Float.parse(l["precio"])   end)
  end

end
