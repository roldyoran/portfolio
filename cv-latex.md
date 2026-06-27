EL CV ES: 

```latex
\documentclass[11pt,letterpaper]{article}

% ===================== PAQUETES =====================
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[spanish]{babel}
\usepackage{lmodern}
\usepackage{tgheros}
\renewcommand{\familydefault}{\sfdefault}
\usepackage[margin=0.75in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage{hyperref}
\usepackage{fontawesome5}
\usepackage{xcolor}
\usepackage{tabularx}
\usepackage{ragged2e}

% ===================== COLOR (sutil, imprime bien en blanco y negro) =====================
\definecolor{darkblue}{RGB}{0,51,102}

% ===================== CONFIG HYPERLINKS =====================
\hypersetup{
    colorlinks=true,
    linkcolor=darkblue,
    urlcolor=darkblue,
}

% ===================== ESPACIADO GENERAL =====================
\pagestyle{empty}
\setlength{\parindent}{0pt}
\setlength{\topskip}{0pt}
\setlength{\parskip}{0pt}

% ===================== ESTILO DE SECCIONES (Harvard style) =====================
\titleformat{\section}
  {\large\bfseries\scshape\color{darkblue}}
  {}{0em}{}
  [\vspace{1pt}\titlerule\vspace{2pt}]
\titlespacing{\section}{0pt}{10pt}{4pt}

\titleformat{\subsection}
  {\bfseries}
  {}{0em}{}
\titlespacing{\subsection}{0pt}{6pt}{2pt}

% ===================== LISTAS COMPACTAS =====================
\setlist[itemize]{leftmargin=*, itemsep=2pt, topsep=2pt, parsep=0pt, partopsep=0pt}

% ===================== COMANDOS PERSONALIZADOS =====================
% Encabezado de experiencia/proyecto: Puesto/Título a la izquierda, Fecha a la derecha
\newcommand{\entryheader}[2]{%
  \noindent\textbf{#1} \hfill \textit{#2}\\
}
% Subtítulo: institución/empresa a la izquierda, ubicación o tecnologías a la derecha
\newcommand{\entrysub}[2]{%
  \noindent#1 \hfill #2\\[2pt]
}

\begin{document}

% ===================== ENCABEZADO =====================
\begin{center}
    {\Huge \scshape \textbf{Edgar Rolando Alvarez Rodriguez}}\\[6pt]
    \small
    San Miguel Petapa, Guatemala \quad $|$ \quad
    \href{tel:+50255490300}{5549 0300} \quad $|$ \quad
    \href{mailto:edgaralvarez4204@gmail.com}{edgaralvarez4204@gmail.com}\\[2pt]
    \href{https://linkedin.com/in/roldyoran}{linkedin.com/in/roldyoran} \quad $|$ \quad
    \href{https://roly.top/portfolio}{roly.top/portfolio} \quad $|$ \quad
    \href{https://github.com/roldyoran}{github.com/roldyoran}
\end{center}

\vspace{4pt}

% ===================== PERFIL PROFESIONAL =====================
\section*{Perfil Profesional}
Ingeniero en Ciencias y Sistemas (USAC, pensum cerrado) con experiencia en desarrollo backend, microservicios, frontend y despliegue de infraestructura cloud. Dominio de Go, Python y TypeScript; experiencia práctica con Kubernetes, Docker, RabbitMQ y observabilidad con Prometheus y Grafana.

% ===================== EXPERIENCIA PROFESIONAL =====================
\section*{Experiencia Profesional}

\entryheader{Tutor Académico --- Laboratorio de Sistemas Operativos 1}{Julio 2025 -- Mayo 2026}
\entrysub{Facultad de Ingeniería, Escuela de Ciencias y Sistemas --- Universidad de San Carlos de Guatemala}

\begin{itemize}
    \item Capacité a 139 estudiantes universitarios en total (96 en el primer semestre, julio--noviembre 2025; 43 en el segundo, enero--mayo 2026) en Linux, desarrollo de módulos del kernel y administración de entornos virtualizados, mejorando la comprensión práctica y el desempeño del laboratorio.
    \item Diseñé e impartí material técnico complementario sobre Kubernetes, contenedores Docker y buenas prácticas de despliegue de microservicios, fortaleciendo las competencias técnicas del 100\% de los estudiantes a cargo.
    \item Brindé mentoría individualizada para la resolución de problemas técnicos complejos y evalué ejercicios y proyectos prácticos de laboratorio, garantizando retroalimentación oportuna a cada estudiante.
    \item Documentos oficiales disponibles en: \href{https://roly.top/tutordtt}{roly.top/tutordtt}
\end{itemize}

% ===================== EDUCACIÓN =====================
\section*{Educación}

\entryheader{Ingeniería en Ciencias y Sistemas}{Enero 2020 -- Mayo 2026}
\entrysub{Universidad de San Carlos de Guatemala (USAC)}{Pensum Cerrado}

\vspace{4pt}
\entryheader{Bachiller en Ciencias y Letras con Orientación en Computación}{Diciembre 2018}
\entrysub{Colegio Mahanaim}{Guatemala}

% ===================== PROYECTOS TÉCNICOS =====================
\section*{Proyectos Técnicos}

\entryheader{ROLY.TOP --- Acortador de URLs (Aplicación en Producción)}{Proyecto Personal}
\entrysub{TypeScript $\cdot$ Vue.js $\cdot$ Cloudflare Workers}{Desplegado en producción}
\begin{itemize}
    \item Arquitecté y desarrollé un servicio acortador de URLs con códigos personalizados, contador de visitas en tiempo real y API REST con autenticación mediante Google OAuth.
    \item Implementé arquitectura hexagonal utilizando TypeScript (framework Hono) con Drizzle ORM sobre Cloudflare D1, con frontend desarrollado en Vue.js.
    \item Desplegué la aplicación sobre Cloudflare Workers mediante edge computing, logrando una latencia global menor a 40 ms y un uptime del 99\%, eliminando la necesidad de servidores tradicionales.
    \item Implementé medidas de seguridad mediante autenticación OAuth, validación estricta de entradas y manejo correcto de códigos HTTP estándar, reduciendo el riesgo de accesos no autorizados.
    \item Código fuente: \href{https://github.com/roldyoran/roly.top}{github.com/roldyoran/roly.top} \quad $|$ \quad Web: \href{https://roly.top}{roly.top}
\end{itemize}

\newpage

\vspace{4pt}
\entryheader{Plataforma de Monitoreo Olímpico --- Sistema Distribuido en la Nube}{Proyecto Académico}
\entrysub{Go $\cdot$ Rust $\cdot$ Kubernetes $\cdot$ GCP}{Google Kubernetes Engine (GKE)}
\begin{itemize}
    \item Diseñé y desarrollé una plataforma distribuida de monitoreo en tiempo real para el sistema de Juegos Olímpicos de la USAC, desplegada sobre un clúster de 6 nodos en Google Kubernetes Engine.
    \item Construí microservicios en Go y Rust con comunicación entre servicios mediante gRPC, integrando Apache Kafka para mensajería orientada a eventos y Redis para caché en tiempo real.
    \item Configuré un stack completo de observabilidad con Prometheus y Grafana, habilitando monitoreo de recursos y trazabilidad del rendimiento del clúster bajo alta carga concurrente.
    \item Simulé tráfico de alto volumen con Locust dirigido al Kubernetes Ingress, validando el escalado automático horizontal de los servicios ante demandas concurrentes.
    \item Código fuente: \href{https://github.com/roldyoran/gke-k8s-olympic-microservices}{github.com/roldyoran/gke-k8s-olympic-microservices}
\end{itemize}

% ===================== HABILIDADES TÉCNICAS =====================
\section*{Habilidades Técnicas}
\begin{tabularx}{\linewidth}{@{}l X@{}}
\textbf{Lenguajes de Programación:} & Go, Python, TypeScript, Java, SQL \\[3pt]
\textbf{DevOps e Infraestructura:} & Git, Docker, Kubernetes (GKE), Prometheus, Grafana, Locust, CI/CD \\[3pt]
\textbf{Frameworks y Bibliotecas:} & FastAPI, Hono, Vue.js, React, Astro, Next.js, TanStack Start \\[3pt]
\textbf{Mensajería y Bases de Datos:} & Redis, PostgreSQL, SQLite, MySQL, Apache Kafka, RabbitMQ  \\[3pt]
\textbf{Cloud Computing:} & Google Cloud Platform (GCP/GKE), Amazon Web Services (AWS), Cloudflare \\[3pt]
\textbf{Protocolos y Arquitectura:} & API REST, gRPC, Microservicios, Arquitectura Hexagonal, Sistemas Orientados a Eventos \\
\end{tabularx}

% ===================== IDIOMAS =====================
\section*{Idiomas}
\textbf{Español:} Nativo \\
\textbf{Inglés:} Intermedio

\end{document}

```
