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

export interface Usuario{
    id? : string,
    dni: string,
    nombres: string,
    apellidos: string,
    fechaNacimiento: Date,
    email : string,
    password : string,
    phone? : string,
    role? : string,
}

export interface Orden{
    id?: string,
    departamento: string,
    provincia: string,
    direccion : string,
    status: string,
    createdAt: Date,
    precioTotal: number,
    totalItems: number

}

export interface OrdenItem{
    id: string
    cantidad: number
    producto: Producto
}



export interface AuthentificationRequest{
    email: string,
    password: string
}

export interface productForOrder{
    id: string,
    cantidad: number,
}
export interface OrderRequest{
    userId : string,
    departamento: string,
    provincia: string,
    direccion : string,
    orderItems: productForOrder[]
}
