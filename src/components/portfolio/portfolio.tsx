"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Code, Layers, Workflow, Menu, X, Mail, MessageCircle } from "lucide-react";
import logo from "@/imgs/Logo.png";
import type { CategoryKey } from "@/types/catalog";
import type { PortfolioProject } from "./portfolioData";
import { DEMONSTRATION_NOTICE, OFFICIAL_CONTACT, PORTFOLIO_CATEGORIES } from "./portfolioIdentity";
import styles from "./portfolio.module.css";
import { GeometricCore } from "./geometricCore";

const NAV = [
  { href: "#catalogo", label: "Projetos" },
  { href: "#sobre", label: "A essência" },
  { href: "#contato", label: "Contato" },
];

export function Portfolio({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState<CategoryKey | "todos">("todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const visible = active === "todos" ? projects : projects.filter((project) => project.category === active);

  return (
    <div className={styles.portfolio}>
      <a className={styles.skip} href="#conteudo">Ir para o conteúdo</a>
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <Link href="/" className={styles.brand} aria-label="Code Maestro Tech — início">
            <Image src={logo} alt="" width={52} height={52} sizes="52px" />
            <span>CODE MAESTRO<span className={styles.brandTech}>TECH / DIGITAL EXPERIENCES</span></span>
          </Link>
          <nav aria-label="Navegação principal" className={styles.desktopNav}>
            {NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <a className={styles.headerContact} href={OFFICIAL_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
            Vamos conversar <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button className={styles.menuToggle} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="portfolio-menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {menuOpen && <nav id="portfolio-menu" aria-label="Navegação mobile" className={styles.mobileNav}>
          {NAV.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
          <a href={OFFICIAL_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Conversar no WhatsApp <ArrowUpRight size={16} aria-hidden="true" /></a>
        </nav>}
      </header>

      <main id="conteudo" tabIndex={-1}>
        <section className={`${styles.hero} ${styles.wrap}`} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span /> CODE MAESTRO TECH / PORTFÓLIO DIGITAL</p>
            <h1 id="hero-title">A magia da<br /><span>nova era.</span></h1>
            <p className={styles.heroTagline}>A magia da tecnologia.</p>
            <p className={styles.heroDescription}>Explore experiências digitais demonstrativas e descubra novas possibilidades para transformar ideias em tecnologia.</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#catalogo">Explorar projetos <ArrowDown size={17} aria-hidden="true" /></a>
              <a className={styles.secondary} href={OFFICIAL_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            <div className={styles.heroFootnote}><Code size={16} aria-hidden="true" /><span>Da primeira ideia à experiência digital.</span></div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.visualTop} aria-hidden="true"><span>CM / IDENTIDADE DIGITAL</span><span>01 — ∞</span></div>
            <div className={styles.logoStage}>
              <GeometricCore />
            </div>
            <div className={styles.visualBottom} aria-hidden="true"><span>ENGENHARIA × CRIATIVIDADE</span><span className={styles.signal}>CONEXÕES QUE TRANSFORMAM</span></div>
          </div>
        </section>

        <div className={styles.manifestStrip}>
          <div className={styles.wrap}><span><strong>12</strong> experiências digitais</span><span><strong>04</strong> universos para explorar</span><span className={styles.stripLast}>Ideias reais. <strong>Possibilidades infinitas.</strong></span></div>
        </div>

        <section id="catalogo" className={`${styles.catalog} ${styles.wrap}`} aria-labelledby="projects-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>01 / LABORATÓRIO DE POSSIBILIDADES</p><h2 id="projects-title">Ideias em <span>movimento.</span></h2></div>
            <p>Explore diferentes formas de estar no digital.<br />Cada projeto, uma experiência para descobrir.</p>
          </div>
          <div className={styles.filters} role="group" aria-label="Filtrar projetos por categoria">
            <button type="button" aria-pressed={active === "todos"} onClick={() => setActive("todos")}>Todos <span>12</span></button>
            {PORTFOLIO_CATEGORIES.map((category) => <button type="button" key={category.key} aria-pressed={active === category.key} onClick={() => setActive(category.key)}>{category.label}<span>03</span></button>)}
          </div>
          <p className={styles.resultCount} role="status" aria-live="polite">{visible.length} demonstrações {active === "todos" ? "para explorar" : `em ${PORTFOLIO_CATEGORIES.find((category) => category.key === active)?.label.toLowerCase()}`}</p>
          <div className={styles.projectGrid}>
            {visible.map((project) => <article className={styles.card} key={project.id}>
              <div className={styles.preview}>
                <div className={styles.browserBar} aria-hidden="true"><i /><i /><i /><span>EXPERIÊNCIA DEMONSTRATIVA</span><ArrowUpRight size={12} /></div>
                <Image src={project.preview} alt={`Prévia da demonstração ${project.name}`} width={1440} height={900} sizes="(max-width: 620px) 95vw, (max-width: 1000px) 46vw, 30vw" />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardCategory}>{PORTFOLIO_CATEGORIES.find((category) => category.key === project.category)?.label}<span aria-hidden="true">↗</span></p>
                <h3>{project.name}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
                <Link href={project.route} className={styles.projectLink} aria-label={`Explorar demonstração: ${project.name}`}>Explorar demonstração <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </article>)}
          </div>
          <p className={styles.notice}><span aria-hidden="true">ⓘ</span>{DEMONSTRATION_NOTICE}</p>
        </section>

        <section id="sobre" className={styles.about} aria-labelledby="about-title">
          <div className={`${styles.wrap} ${styles.aboutGrid}`}>
            <div>
              <p className={styles.eyebrow}>02 / CÓDIGO COM PROPÓSITO</p>
              <h2 id="about-title">Engenharia na base.<br /><span>Criatividade no DNA.</span></h2>
              <p className={styles.aboutDescription}>A Code Maestro Tech é uma marca independente de desenvolvimento de soluções digitais, criada para transformar ideias em projetos tecnológicos e ajudar pessoas e negócios a crescer.</p>
              <a className={styles.textLink} href="#contato">Vamos conectar ideias <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
            <div className={styles.principles}>
              {[{ icon: Code, title: "Precisão que faz sentido.", text: "Estrutura, clareza e atenção a cada interação. A tecnologia como fundamento de uma boa experiência." }, { icon: Layers, title: "Identidade em cada detalhe.", text: "Linguagens visuais distintas para explorar a personalidade e as possibilidades de cada ideia." }, { icon: Workflow, title: "Possibilidades em conexão.", text: "Da presença digital às experiências interativas. Um olhar criativo para o que o digital pode ser." }].map(({ icon: Icon, title, text }, index) => <div className={styles.principle} key={title}><span className={styles.principleIcon}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span><div><span className={styles.principleNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div></div>)}
            </div>
          </div>
        </section>

        <section id="contato" className={`${styles.contactSection} ${styles.wrap}`} aria-labelledby="contact-title">
          <div className={styles.contactPanel}>
            <p className={styles.eyebrow}>03 / A PRÓXIMA CONEXÃO</p>
            <h2 id="contact-title">Sua próxima ideia<br />pode se tornar <span>realidade.</span></h2>
            <p>Tem um projeto em mente? Entre em contato com a Code Maestro Tech e vamos conversar sobre as possibilidades.</p>
            <div className={styles.actions}>
              <a className={styles.primary} href={OFFICIAL_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />Conversar no WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a>
              <a className={styles.secondary} href={`mailto:${OFFICIAL_CONTACT.email}`}><Mail size={18} aria-hidden="true" />Enviar e-mail</a>
            </div>
            <div className={styles.contactDetails}><a href={OFFICIAL_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">{OFFICIAL_CONTACT.phone}</a><a href={`mailto:${OFFICIAL_CONTACT.email}`}>{OFFICIAL_CONTACT.email}</a><a href={OFFICIAL_CONTACT.site} target="_blank" rel="noopener noreferrer">{OFFICIAL_CONTACT.domain} <ArrowUpRight size={12} aria-hidden="true" /></a></div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerTop}`}>
          <Link href="/" className={styles.brand} aria-label="Code Maestro Tech — início"><Image src={logo} alt="" width={48} height={48} sizes="48px" /><span>CODE MAESTRO<span className={styles.brandTech}>TECH / A MAGIA DA TECNOLOGIA.</span></span></Link>
          <p>Ideias, código e novas possibilidades.</p>
          <a href="#conteudo" className={styles.backTop}>Voltar ao topo <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <div className={`${styles.wrap} ${styles.footerBottom}`}><span>Code Maestro Tech · Marca independente de desenvolvimento digital.</span><span>Portfólio demonstrativo / Nenhum projeto representa um cliente real.</span></div>
      </footer>
    </div>
  );
}
