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

export interface AuthentificationRequest{
    email: string,
    password: string
}

