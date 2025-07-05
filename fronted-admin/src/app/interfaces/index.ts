export interface Producto{
    id: string ,
    nombre: string,
    description: string,
    precio: number,
    stock: number,
    imageUrl: string,
    categoria: Categoria

}

export interface Categoria{
    id: number,
    nombre: string
}