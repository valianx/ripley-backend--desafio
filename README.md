<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Sistema desafio Ripley</h3>

<div align="center">


</div>

---

<p align="center"> Desafio tecnico banco ripley - transformacion digital
    <br> 
</p>


## 🏁 Getting Started <a name = "getting_started"></a>

El sistema esta utlizando la base de datos postgres como base de datos principal y redis para cache de información y utilidades dentro de la plataforma

### Requisitos

Para iniciar el sistema se necesita tener instalado nodemon, typescript y concurrently en el sistema

```
npm nodemon typescript concurrently -g
```

Para correrlo en desarrollo se usa el comando

```
npm run dev
```

### Docker

Para correr el contenedor en segundo plano se utiliza el comando 

```
docker-compose up -d
```

para cancelar el proceso

```
docker-compose down
```
Para actualizar el sistema y hacer un nuevo build 

```
docker-compose up -d --build
```

## 🏁 Documentación <a name = "getting_started"></a>

Toda la documentación se encuentra en:
```
https://desafio-ripley-app.herokuapp.com/api/docs/

http://localhost:8080/api/docs/

```