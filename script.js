/* ==============================
   VARIÁVEIS
============================== */
const paineis = document.querySelectorAll(".painel");
const formas = document.querySelectorAll(".forma");
const menu = document.querySelector(".menu");
const botaoMobile = document.getElementById("botaoMobile");
const menuMobile = document.getElementById("menuMobile");


/* ==============================
   SCROLL / ANIMAÇÕES
============================== */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > 60) {
    menu.classList.add("ativo");
  } else {
    menu.classList.remove("ativo");
  }

  paineis.forEach(painel => {
    const rect = painel.getBoundingClientRect();
    const alturaJanela = window.innerHeight;

    const progresso = Math.min(
      Math.max((alturaJanela - rect.top) / alturaJanela, 0),
      1
    );

    if (painel.classList.contains("curvado")) {
      const raio = 260 - progresso * 260;
      painel.style.borderTopLeftRadius = raio + "px";
      painel.style.borderTopRightRadius = raio + "px";
    }

    const conteudo = painel.querySelector(".conteudo");
    if (conteudo && rect.top < alturaJanela && rect.bottom > 0) {
      conteudo.style.transform = `translateY(${40 - progresso * 40}px)`;
    }
  });

  formas.forEach((forma, index) => {
    const velocidade = (index + 1) * 12;
    forma.style.transform = `translateY(${scrollY / velocidade}px)`;
  });
});


/* ==============================
   MENU MOBILE
============================== */
botaoMobile?.addEventListener("click", () => {
  menuMobile.classList.toggle("ativo");
});

menuMobile?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menuMobile.classList.remove("ativo");
  });
});


/* ==============================
   ACCORDION
============================== */
document.querySelectorAll(".area").forEach(area => {
  const cabecalho = area.querySelector(".area-cabecalho");

  cabecalho.addEventListener("click", () => {
    document.querySelectorAll(".area").forEach(a => {
      if (a !== area) a.classList.remove("ativa");
    });
    area.classList.toggle("ativa");
  });
});


/* ==============================
   ÂNCORAS — FIX DEFINITIVO P/ STICKY
============================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const id = link.getAttribute("href");
    const alvo = document.querySelector(id);
    if (!alvo) return;

    e.preventDefault();

    // 1️⃣ Desativa sticky temporariamente
    paineis.forEach(p => p.style.position = "relative");

    // 2️⃣ Scroll correto
    const headerOffset = menu.offsetHeight + 10;
    const y =
      alvo.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });

    // 3️⃣ Reativa sticky após o scroll
    setTimeout(() => {
      paineis.forEach(p => p.style.position = "sticky");
    }, 800);
  });
});
