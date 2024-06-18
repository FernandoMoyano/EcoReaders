# Diagrama de Flujo Para la Edicion de un Libro

---

```mermaid
graph TD
    %% Definición de los componentes
    A[MyPublished]
    B[ModalEditBook]
    C[EditForm]
    D[Redux API ]
    E[Controller]
    F[Service]

    %% Conexiones
    A -->|handleEdit| B
    B -->|initialBookData| C
    C -->|handlePostEditedBook| D
    D -->|userId, bookId, editedBook| E
    E -->|userId, bookId, changes| F

    %% Detalles de los Props
    subgraph Props
        A1[Props: data, error, isLoading, handleEdit, handleDelete, bookIdToDelete] --> A
        B1[Props: initialBookData, closeModal, isOpen] --> B
        C1[Props: initialBookData, handlePostEditedBook, handleInputChange, handleSelectChange, editedBook] --> C
        D1[Params: userId, bookId, editedBook] --> D
        E1[Params: userId, bookId, changes] --> E
        F1[Params: userId, bookId, changes] --> F
    end

    %% Estilos
    style A fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style B fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style C fill:#9cf,stroke:#333,stroke-width:4px,color:#000
    style D fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style E fill:#fc9,stroke:#333,stroke-width:4px,color:#000
    style F fill:#ff9,stroke:#333,stroke-width:4px,color:#000
```

## Descripción de la Conexión entre Componentes

---

### MyPublished:

- **Props**: data, error, isLoading, handleEdit, handleDelete, bookIdToDelete.
- **Función principal:** Muestra la lista de libros publicados y maneja la edición/eliminación de libros.
- **Interacción:** Llama a handleEdit(book) que abre ModalEditBook.

### ModalEditBook:

- **Props:** initialBookData, closeModal, isOpen.
- **Función principal:** Muestra el formulario de edición de libro.
- **Interacción:** Pasa initialBookData a EditForm.

### EditForm:

- **Props:** initialBookData, handlePostEditedBook, handleInputChange, handleSelectChange, editedBook.
- **Función principal:** Formulario para editar los detalles del libro.
- **Interacción:** Llama a handlePostEditedBook que despacha Redux API (updateBook).

### Redux API (updateBook):

- **Params:** userId, bookId, editedBook.
- **Función principal:** Acción de Redux para actualizar un libro en el servidor.
- **Interacción:** Envia datos al Controller (updateBook).

### Controller (updateBook):

- **Params:** userId, bookId, changes.
- **Función principal:** Controlador del backend que maneja la solicitud de actualización.
- **Interacción:** Llama al Service (update).

### Service (update):

- **Params:** userId, bookId, changes.
- **Función principal:** Servicio que realiza la actualización en la base de datos.
- **Interacción:** Ejecuta la consulta SQL para actualizar el libro en la base de datos.

# Diagrama de Flujo Para la Creación de un Libro

---

```mermaid
graph TD
    %% Definición de los componentes
    A[Books Page]
    B[ModalNewBook]
    C[PublicationForm]
    D[Redux API ]
    E[Controller ]
    F[Service ]

    %% Conexiones
    A -->|openModal| B
    B -->|initialBookData| C
    C -->|handlePostNewBook| D
    D -->|dataNewBook| E
    E -->|bookDetails| F

    %% Detalles de los Props
    subgraph Props
        A1[Props: data, isLoading, isError] --> A
        B1[Props: isOpen, setIsOpen] --> B
        C1[Props: initialBookData, handlePostNewBook, handleInputChange, handleSelectChange, dataNewBook] --> C
        D1[Param: dataNewBook] --> D
        E1[Param: bookDetails] --> E
        F1[Param: bookDetails] --> F
    end

    %% Estilos
    style A fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style B fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style C fill:#9cf,stroke:#333,stroke-width:4px,color:#000
    style D fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style E fill:#fc9,stroke:#333,stroke-width:4px,color:#000
    style F fill:#ff9,stroke:#333,stroke-width:4px,color:#000

```

## Descripción de la Conexión entre Componentes

---

### Books Page:

- **Props:** data, isLoading, isError.
- **Función principal:** Muestra la lista de libros y tiene un botón para abrir el modal de nuevo libro.
- **Interacción:** Llama a openModal para abrir ModalNewBook.

### ModalNewBook:

- **Props:** isOpen, setIsOpen.
- **Función principal:** Muestra el modal para crear un nuevo libro.
- **Interacción:** Pasa initialBookData a PublicationForm.

### PublicationForm:

- **Props:** initialBookData, handlePostNewBook, handleInputChange, handleSelectChange, dataNewBook.
- **Función principal:** Formulario para ingresar los detalles del nuevo libro.
- **Interacción:** Llama a handlePostNewBook que despacha la acción de Redux API (postNewBook).

### Redux API (postNewBook):

- **Param:** dataNewBook.
- **Función principal:** Acción de Redux para crear un nuevo libro en el servidor.
- **Interacción:** Envia dataNewBook al Controller (creteBook).

### Controller (creteBook):

- **Param:** bookDetails.
- **Función principal:** Controlador del backend que maneja la solicitud de creación.
- **Interacción:** Llama al Service (create).

### Service (create):

- **Param:** bookDetails.
- **Función principal:** Servicio que realiza la inserción en la base de datos.
- **Interacción:** Ejecuta la consulta SQL para crear el nuevo libro en la base de datos.

# Diagrama de Flujo Para la Eliminación de un Libro

---

```mermaid
graph TD
    %% Definición de los componentes
    A[MyPublished]
    B[Notification]
    C[Redux API ]
    D[Controller ]
    E[Service ]

    %% Conexiones
    A -->|handleDelete| B
    B -->|onConfirm| C
    C -->|bookId| D
    D -->|id| E

    %% Detalles de los Props
    subgraph Props
        A1[Props: data, error, isLoading, handleDelete, handleEdit, bookIdToDelete] --> A
        B1[Props: message, onConfirm, onCancel] --> B
        C1[Param: bookId] --> C
        D1[Param: id] --> D
        E1[Param: id] --> E
    end

    %% Estilos
    style A fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style B fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style C fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style D fill:#fc9,stroke:#333,stroke-width:4px,color:#000
    style E fill:#ff9,stroke:#333,stroke-width:4px,color:#000

```

## Descripción de la Conexión entre Componentes

---

### MyPublished:

- **Props:** data, error, isLoading, handleDelete, handleEdit, bookIdToDelete.
- **Función principal:** Muestra la lista de libros publicados y maneja la edición/eliminación de libros.
- **Interacción:** Llama a handleDelete(bookId) que abre Notification.

### Notification:

- **Props:** message, onConfirm, onCancel.
- **Función principal:** Muestra una notificación de confirmación para eliminar un libro.
- **Interacción:** onConfirm llama a la acción de Redux API (deleteBook).

### Redux API (deleteBook):

- **Param:** bookId.
- **Función principal:** Acción de Redux para eliminar un libro en el servidor.
- **Interacción:** Envia bookId al Controller (deleteBook).

### Controller (deleteBook):

- **Param:** id.
- **Función principal:** Controlador del backend que maneja la solicitud de eliminación.
- **Interacción:** Llama al Service (delete).

### Service (delete):

- **Param:** id.
- **Función principal:** Servicio que realiza la eliminación en la base de datos.
- **Interacción:** Ejecuta la consulta SQL para eliminar el libro de la base de datos.

# Diagrama de Flujo Para la Obtención de todos los Libros

---

```mermaid

graph TD
    %% Definición de los componentes
    A[Books Page]
    B[Redux API]
    C[Controller]
    D[Service]

    %% Conexiones
    A -->|useGetBooksQuery| B
    B -->|query: /books| C
    C -->|Responde con los libros| D

    %% Detalles de los Props
    subgraph Props
        A1[Props: data, isLoading, isError] --> A
        B1[Param: void] --> B
        C1[Param: req, res] --> C
        D1[Param: none] --> D
    end

    %% Estilos
    style A fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style B fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style C fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style D fill:#fc9,stroke:#333,stroke-width:4px,color:#000


```

## Descripción de la Conexión entre Componentes

---

### Books Page:

- **Props:** data, isLoading, isError.
- **Función principal:** Muestra la lista de libros disponibles.
- **Interacción:** Llama a useGetBooksQuery() que conecta con la API de Redux.

### Redux API (getBooks):

- **Param:** void.
- **Función principal:** Acción de Redux para obtener todos los libros del servidor.
- **Interacción:** Envía una solicitud GET a /books al Controller (getBooks).

### Controller (getBooks):

- **Param:** req, res.
- **Función principal:** Controlador del backend que maneja la solicitud para obtener todos los libros.
- **Interacción:** Llama al Service (getAll) para obtener los datos.

### Service (getAll):

- **Param:** none.
- **Función principal:** Servicio que realiza la consulta en la base de datos para obtener todos los libros.
- **Interacción:** Ejecuta la consulta SQL y devuelve los libros encontrados.

# Diagrama de Flujo Para la Obtención de Libros por usuario

---

```mermaid
graph TD
    %% Definición de los componentes
    A[MyPublished Page]
    B[Redux API]
    C[Controller]
    D[Service]
    E[Database]

    %% Conexiones
    A -->|useGetMyPublishedBooksQuery| B
    B -->|query: /books/user/:userId/my-books| C
    C -->|Calls getAllByUserId| D
    D -->|Executes query| E

    %% Detalles de los Props
    subgraph Props
        A1[Props: data, isLoading, isError] --> A
        B1[Param: userId] --> B
        C1[Param: req, res] --> C
        D1[Param: userId] --> D
        E1[Param: userId] --> E
    end

    %% Estilos
    style A fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style B fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style C fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style D fill:#fc9,stroke:#333,stroke-width:4px,color:#000
    style E fill:#9cf,stroke:#333,stroke-width:4px,color:#000


```

## Descripción de la Conexión entre Componentes

### MyPublished Page:

- **Props:** data, isLoading, isError.
- **Función principal:** Muestra la lista de libros publicados por el usuario.
- **Interacción:** Llama a useGetMyPublishedBooksQuery(userId) que conecta con la API de Redux.

### Redux API (getMyPublishedBooks):

- **Param:** userId.
- **Función principal:** Acción de Redux para obtener todos los libros publicados por un usuario específico.
- **Interacción:** Envía una solicitud GET a /books/user/
  /my-books al Controller (getBooksByUser).

### Controller (getBooksByUser):

- **Param:** req, res.
- **Función principal:** Controlador del backend que maneja la solicitud para obtener todos los libros publicados por un usuario.
- **Interacción:** Llama al Service (getAllByUserId) para obtener los datos.

### Service (getAllByUserId):

- **Param:** userId.
- **Función principal:** Servicio que realiza la consulta en la base de datos para obtener todos los libros publicados por un usuario.
- **Interacción:** Ejecuta la consulta SQL y devuelve los libros encontrados.

### Database:

- **Param:** userId.
- **Función principal:** Almacena los datos de los libros y usuarios.
- **Interacción:** Ejecuta la consulta SQL y devuelve los libros encontrados para el usuario especificado.

# Diagrama de Flujo Para la Obtención de un libro por id

---

```mermaid
graph TD
%% Definición de los componentes
A[BookDetail Page]
B[Redux API]
C[Controller]
D[Service]
E[Database]

    %% Conexiones
    A -->|useGetBookQuery| B
    B -->|query: /books/:id| C
    C -->|Calls getOne| D
    D -->|Executes query| E

    %% Detalles de los Props
    subgraph Props
        A1[Props: data, error, isLoading] --> A
        B1[Param: id] --> B
        C1[Param: req, res] --> C
        D1[Param: id] --> D
        E1[Param: id] --> E
    end

    %% Estilos
    style A fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style B fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style C fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style D fill:#fc9,stroke:#333,stroke-width:4px,color:#000
    style E fill:#9cf,stroke:#333,stroke-width:4px,color:#000
```

## Descripción de la Conexión entre Componentes

---

### BookDetail Page:

- **Props:** data, error, isLoading.
- **Función principal:** Muestra los detalles de un libro específico.
- **Interacción:** Llama a useGetBookQuery(id) que conecta con la API de Redux.

### Redux API (getBook):

- **Props:** id.
- **Función principal:** Acción de Redux para obtener los detalles de un libro específico.
- **Interacción:** Envía una solicitud GET a /books/ al Controller (getBook).

### Controller (getBook):

- **Props:** req, res.
- **Función principal:** Controlador del backend que maneja la solicitud para obtener los detalles de un libro específico.
- **Interacción:** Llama al Service (getOne) para obtener los datos.

### Service (getOne):

- **Props:** id.
- **Función principal:** Servicio que realiza la consulta en la base de datos para obtener los detalles de un libro específico.
- **Interacción:** Ejecuta la consulta SQL y devuelve los detalles del libro.

### Database:

- **Props:** id.
- **Función principal:** Almacena los datos de los libros y usuarios.
- **Interacción:** Ejecuta la consulta SQL y devuelve los detalles del libro específico.

## Arbol de componentes

---

```mermaid

graph TD
    %% Definición de los componentes
    A[App.tsx]
    B[Welcome]
    C[Books]
    D[BookDetail]
    E[MyPublished]
    F[Login]
    G[Register]

    %% Conexiones
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G

    %% Books component hierarchy
    C --> H[Spinner]
    C --> I[NavBar]
    C --> J[ModalNewBook]
    J --> K[PublicationForm]
    K --> L[Spinner]

    %% BookDetail component hierarchy
    D --> M[Spinner]
    D --> N[NavBar]
    D --> O[StarRating]

    %% MyPublished component hierarchy
    E --> P[Spinner]
    E --> Q[NavBar]
    E --> R[Notification]
    E --> S[ModalEditBook]
    S --> T[EditForm]
    T --> U[TextInput]
    T --> V[SelectInput]

    %% Login component hierarchy
    F --> W[LoginForm]
    W --> X[Spinner]

    %% Register component hierarchy
    G --> Y[RegisterForm]
    Y --> Z[Spinner]



    %% Estilos
    style A fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style B fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style C fill:#9cf,stroke:#333,stroke-width:4px,color:#000
    style D fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style E fill:#fc9,stroke:#333,stroke-width:4px,color:#000
    style F fill:#ff9,stroke:#333,stroke-width:4px,color:#000
    style G fill:#ff9,stroke:#333,stroke-width:4px,color:#000
    style H fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style I fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style J fill:#9cf,stroke:#333,stroke-width:4px,color:#000
    style K fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style L fill:#fc9,stroke:#333,stroke-width:4px,color:#000
    style M fill:#ff9,stroke:#333,stroke-width:4px,color:#000
    style N fill:#ff9,stroke:#333,stroke-width:4px,color:#000
    style O fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style P fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style Q fill:#9cf,stroke:#333,stroke-width:4px,color:#000
    style R fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style S fill:#fc9,stroke:#333,stroke-width:4px,color:#000
    style T fill:#ff9,stroke:#333,stroke-width:4px,color:#000
    style U fill:#ff9,stroke:#333,stroke-width:4px,color:#000
    style V fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style W fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style X fill:#9cf,stroke:#333,stroke-width:4,color:#000


```

## Descripción de la Conexión entre Componentes para las operaciones CRUD

---

```mermaid
graph
    %% Definición de los componentes
    A["Books Page"] -->|useGetBooksQuery| B["Redux API - getBooks"]
    B -->|query: /books| C["BookController - getBooks"]
    C -->|Calls getAll| D["BookService - getAll"]
    D <-->|Executes query| E["Database - Books"]

    %% Conexiones para obtener libros por usuario
    F["MyPublished Page"] -->|useGetMyPublishedBooksQuery| G["Redux API - getMyPublishedBooks"]
    G -->|query: /books/user/:userId/my-books| H["BookController - getBooksByUser"]
    H -->|Calls getAllByUserId| I["BookService - getAllByUserId"]
    I <-->|Executes query| E

    %% Conexiones para obtener un libro en particular
    J["BookDetail Page"] -->|useGetBookQuery| K["Redux API - getBook"]
    K -->|query: /books/:id| L["BookController - getBook"]
    L -->|Calls getOne| M["BookService - getOne"]
    M <-->|Executes query| E

    %% Conexiones para eliminar un libro
    N["MyPublished Page"] -->|useDeleteBookMutation| O["Redux API - deleteBook"]
    O -->|mutation: /books/:id| P["BookController - deleteBook"]
    P -->|Calls deleteOne| Q["BookService - deleteOne"]
    Q -->|Executes delete query| E

    %% Conexiones para editar un libro
    R["**MyPublished Page**"] -->|useUpdateBookMutation| S["Redux API - updateBook"]
    S -->|mutation: /books/user/:userId/edit/:bookId| T["BookController - updateBook"]
    T -->|Calls updateOne| U["BookService - updateOne"]
    U -->|Executes update query| E

    %% Detalles de los Props
    subgraph Props
        A1[Props: data, isLoading, isError] --> A
        B1[Props: void] --> B
        C1[Param: req, res] --> C
        D1[Param: none] --> D

        F1[Props: data, isLoading, isError] --> F
        G1[Props: userId] --> G
        H1[Param: req, res] --> H
        I1[Param: userId] --> I

        J1[Props: data, error, isLoading] --> J
        K1[Props: id] --> K
        L1[Param: req, res] --> L
        M1[Param: id] --> M

        N1[Props: mutation] --> N
        O1[Props: id] --> O
        P1[Param: req, res] --> P
        Q1[Param: id] --> Q

        R1[Props: mutation] --> R
        S1[Props: userId, bookId] --> S
        T1[Param: req, res] --> T
        U1[Param: userId, bookId] --> U

        E1[Props: query] --> E
    end

    %% Estilos
    style A fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style B fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style C fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style D fill:#fc9,stroke:#333,stroke-width:4px,color:#000
    style E fill:#9cf,stroke:#333,stroke-width:4px,color:#000

    style F fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style G fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style H fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style I fill:#fc9,stroke:#333,stroke-width:4px,color:#000

    style J fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style K fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style L fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style M fill:#fc9,stroke:#333,stroke-width:4px,color:#000

    style N fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style O fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style P fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style Q fill:#fc9,stroke:#333,stroke-width:4px,color:#000

    style R fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style S fill:#b9e,stroke:#333,stroke-width:4px,color:#000
    style T fill:#cfc,stroke:#333,stroke-width:4px,color:#000
    style U fill:#fc9,stroke:#333,stroke-width:4px,color:#000


```
