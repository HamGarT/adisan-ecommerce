export interface Producto{
    id: string ,
    nombre: string,
    precio: number,
    stock: number,
    imageUrl: string,
    categoria: Categoria

}

export interface Categoria{
    id: number,
    nombre: string
}