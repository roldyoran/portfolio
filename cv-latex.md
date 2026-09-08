\documentclass[10pt,letterpaper]{article}

% =====================
% PAQUETES
% =====================

\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[spanish]{babel}

\usepackage{lmodern}
\usepackage{tgheros}
\renewcommand{\familydefault}{\sfdefault}

\usepackage[margin=0.55in]{geometry}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage[hidelinks]{hyperref}

% =====================
% COLOR
% =====================

\definecolor{darkblue}{RGB}{0,51,102}

\hypersetup{
colorlinks=true,
urlcolor=darkblue,
linkcolor=darkblue
}

% =====================
% ESTILO GENERAL
% =====================

\pagestyle{empty}
\setlength{\parindent}{0pt}

\titleformat{\section}
{\normalsize\bfseries\scshape\color{darkblue}}
{}{0em}{}
[\titlerule]

\titlespacing{\section}{0pt}{7pt}{3pt}

\setlist[itemize]{
leftmargin=*,
itemsep=2pt,
topsep=2pt
}

\newcommand{\entry}[2]{
\textbf{#1}
\hfill
\textit{#2}\
}

\begin{document}

% =====================
% HEADER
% =====================

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


% =====================
% PERFIL
% =====================

\section*{Perfil Profesional}

Estudiante de Ingenieria en Ciencias y Sistemas (USAC, Ultimo Semestre) con experiencia en desarrollo de software full-stack, administración de sistemas Linux e implementación de soluciones web en entornos productivos. He desarrollado aplicaciones web, automatización de despliegues e implementación de infraestructura moderna utilizando tecnologías backend y cloud. Interés en roles orientados a ingeniería de software, plataformas e infraestructura TI.

% =====================
% EXPERIENCIA
% =====================

\section*{Experiencia Practica}

\entry
{Auxiliar de Cátedra --- Laboratorio de Sistemas Operativos 1}
{Julio 2025 -- Mayo 2026}

Facultad de Ingeniería --- Universidad de San Carlos de Guatemala

\begin{itemize}

\item Brindé apoyo a 139 estudiantes en laboratorios prácticos sobre \textbf{Linux}, virtualización con \textbf{VirtManager/máquinas virtuales}, administración de sistemas y gestión de \textbf{módulos del kernel}.

\item Diseñé y administré entornos de prácticas para \textbf{sistemas distribuidos en tiempo real} orquestados con \textbf{Kubernetes}, utilizando \textbf{gRPC} para comunicación entre servicios y colas de mensajes con \textbf{Kafka} y \textbf{RabbitMQ}.

\item Implementé \textbf{Redis} y \textbf{Valkey} como capas de caché y almacenamiento en memoria, y desarrollé automatizaciones eficientes en \textbf{Go} y \textbf{Rust} para monitoreo y diagnóstico de los laboratorios.

\item Incorporé \textbf{Zot} como container registry para validación de esquemas de configuración, \textbf{Locust} para pruebas de carga y simulación de tráfico, y \textbf{Grafana} para monitoreo y visualización de métricas en tiempo real.

\item Elaboré guías técnicas y documentación estandarizada, resolviendo incidencias de infraestructura y evaluando ejercicios con retroalimentación personalizada para fortalecer el aprendizaje práctico de los estudiantes.

\end{itemize}



% =====================
% EDUCACION
% =====================

\section*{Educación}

\entry
{Ingeniería en Ciencias y Sistemas --- Universidad de San Carlos de Guatemala}
{2020 -- 2026}


\vspace{2pt}

\entry
{Bachiller en Ciencias y Letras con Orientación en Computación}
{2018}
Colegio Mahanaim

% =====================
% PROYECTO
% =====================

\section*{Proyecto Destacado}

\entry
{ROLY.TOP --- Aplicación Web en Producción}
{Proyecto Personal}

\begin{itemize}

\item Diseñé y desarrollé una plataforma web para creación y administración de URLs personalizadas utilizando TypeScript, Vue.js y tecnologías modernas del ecosistema JavaScript

\item Implementé una API REST con autenticación OAuth y persistencia mediante bases de datos relacionales para garantizar acceso seguro y gestión eficiente de información.

\item Configuré despliegues automatizados sobre infraestructura cloud para garantizar disponibilidad continua y reducir operaciones manuales.

\item Implementé validaciones, manejo estructurado de errores, monitoreo y controles de acceso para mejorar seguridad y confiabilidad del sistema.

\item Mantengo activamente el sistema en producción, gestionando actualizaciones, documentación y evolución funcional del proyecto.

\end{itemize}

% =====================
% HABILIDADES
% =====================

\section*{Habilidades Técnicas}

\textbf{Lenguajes de Programación:}\
Python, Go, Java, SQL, JavaScript, TypeScript

\vspace{3pt}

\textbf{Sistemas Operativos y Soporte:}\
Windows, Linux, instalación y configuración de software, virtualización

\vspace{3pt}

\textbf{Bases de Datos:}\
MySQL, PostgreSQL, SQLite, Redis

\vspace{3pt}

\textbf{Infraestructura y Herramientas:}\
Git, Docker, Kubernetes, CI/CD (GitHub Actions), Office 365, Visual Studio Code

\vspace{3pt}

\textbf{Cloud Computing:}\
AWS, GCP, Cloudflare

\vspace{3pt}

\textbf{Seguridad y Redes:}\
Control de acceso, autenticación, ciberseguridad, fundamentos de redes

% =====================
% IDIOMAS
% =====================

\section*{Idiomas}

Español (Nativo)\\
Inglés (Intermedio)

\end{document}
