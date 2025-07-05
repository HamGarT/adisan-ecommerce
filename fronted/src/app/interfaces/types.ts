export interface Producto{
    id: string ,
    nombre: string,
    precio: number,
    stock: number,
    imageUrl: string,
    categoria?: Categoria
    quantity: number

}

export interface Categoria{
    id: number,
    publicId: string,
    nombre: string
}