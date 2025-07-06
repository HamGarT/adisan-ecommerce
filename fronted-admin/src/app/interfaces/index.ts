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

export interface Order{
    id?: string,
    departamento: string,
    provincia: string,
    direccion : string,
    status: string,
    createdAt: Date,
    precioTotal: number,
    totalItems: number

}

export interface OrderItem{
    id: string
    cantidad: number
    producto: Producto
}