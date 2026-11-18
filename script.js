document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  
    // =========================================================
    // 1. ANO AUTOMÁTICO NO RODAPÉ
    // =========================================================
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  
    // =========================================================
    // 2. MENU MOBILE E NAVEGAÇÃO ATIVA
    // =========================================================
    const header = document.getElementById("topo");
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav__link");
  
    function setMenuState(isOpen) {
      if (!navToggle || !navMenu) return;
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
      );
      navMenu.classList.toggle("is-open", isOpen);
    }
  
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        setMenuState(!expanded);
      });
  
      navLinks.forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
      });
  
      const navCta = navMenu.querySelector(".nav__cta");
      if (navCta) {
        navCta.addEventListener("click", () => setMenuState(false));
      }
  
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
          setMenuState(false);
          navToggle.focus();
        }
      });
  
      document.addEventListener("click", (event) => {
        if (
          navMenu.classList.contains("is-open") &&
          !navMenu.contains(event.target) &&
          !navToggle.contains(event.target)
        ) {
          setMenuState(false);
        }
      });
    }
  
    window.addEventListener(
      "scroll",
      () => {
        if (header) {
          header.classList.toggle("is-scrolled", window.scrollY > 12);
        }
      },
      { passive: true }
    );
  
    // Destaque do link da seção atual durante a rolagem
    const observedSections = document.querySelectorAll("main section[id]");
    if ("IntersectionObserver" in window && observedSections.length > 0) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              navLinks.forEach((link) => {
                const isMatch = link.getAttribute("href") === `#${id}`;
                link.classList.toggle("active", isMatch);
              });
            }
          });
        },
        { rootMargin: "-35% 0px -55% 0px" }
      );
  
      observedSections.forEach((sec) => sectionObserver.observe(sec));
    }
  
    // =========================================================
    // 3. CATÁLOGO DIGITAL DINÂMICO (17 PRODUTOS / 4 LINHAS)
    // =========================================================
    const categoryDescriptions = {
      todos:
        "Explore nossas quatro linhas estratégicas de temperos secos 100% naturais.",
      Cotidiano:
        "Linha Cotidiano — Os temperos essenciais para acompanhar suas receitas de todos os dias.",
      Premium:
        "Linha Premium — Misturas especiais e ingredientes selecionados para experiências gastronômicas diferenciadas.",
      Internacionais:
        "Linha Temperos Internacionais — Uma viagem pelos sabores e aromas de diferentes culturas gastronômicas.",
      Multiuso:
        "Linha Multiuso — Especiarias versáteis para receitas doces, salgadas e bebidas."
    };
  
    const produtos = [
      // LINHA 1 — COTIDIANO (4)
      {
        nome: "Orégano",
        categoria: "Cotidiano",
        linhaExibicao: "Linha Cotidiano",
        descricao:
          "Folhas desidratadas aromáticas ideais para molhos, massas, pizzas, saladas e preparos do dia a dia.",
        imagem:
          "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Pimenta-do-reino",
        categoria: "Cotidiano",
        linhaExibicao: "Linha Cotidiano",
        descricao:
          "Sabor marcante e levemente picante para realçar carnes, aves, sopas, legumes e refogados.",
        imagem:
          "https://images.unsplash.com/photo-1599909533681-74046848292b?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Alho em flocos",
        categoria: "Cotidiano",
        linhaExibicao: "Linha Cotidiano",
        descricao:
          "Praticidade e aroma intenso para temperar arroz, feijão, carnes, assados e marinadas.",
        imagem:
          "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Salsa desidratada",
        categoria: "Cotidiano",
        linhaExibicao: "Linha Cotidiano",
        descricao:
          "Toque herbal leve e fresco para finalizar omeletes, molhos, batatas, peixes e pratos caseiros.",
        imagem:
          "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80"
      },
  
      // LINHA 2 — PREMIUM (4)
      {
        nome: "Lemon Pepper",
        categoria: "Premium",
        linhaExibicao: "Linha Premium",
        descricao:
          "Combinação equilibrada de notas cítricas e pimenta, perfeita para grelhados, aves, peixes e vegetais.",
        imagem:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Chimichurri artesanal",
        categoria: "Premium",
        linhaExibicao: "Linha Premium",
        descricao:
          "Mix clássico de ervas e especiarias desidratadas para churrascos, carnes assadas e molhos especiais.",
        imagem:
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Páprica defumada",
        categoria: "Premium",
        linhaExibicao: "Linha Premium",
        descricao:
          "Coloração vibrante e aroma defumado envolvente para ensopados, assados, batatas e marinadas.",
        imagem:
          "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Sal rosa temperado",
        categoria: "Premium",
        linhaExibicao: "Linha Premium",
        descricao:
          "Sal rosa combinado com ervas selecionadas para finalização refinada de cortes e pratos gourmet.",
        imagem:
          "https://images.unsplash.com/photo-1626197031507-c17099753214?auto=format&fit=crop&w=700&q=80"
      },
  
      // LINHA 3 — TEMPEROS INTERNACIONAIS (4)
      {
        nome: "Curry indiano",
        categoria: "Internacionais",
        linhaExibicao: "Temperos Internacionais",
        descricao:
          "Mistura aromática inspirada na culinária indiana, ideal para frangos, ensopados, arroz e legumes.",
        imagem:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Ervas de Provence",
        categoria: "Internacionais",
        linhaExibicao: "Temperos Internacionais",
        descricao:
          "Seleção tradicional de ervas mediterrâneas para assados, legumes grelhados, aves e receitas francesas.",
        imagem:
          "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Garam Masala",
        categoria: "Internacionais",
        linhaExibicao: "Temperos Internacionais",
        descricao:
          "Blend sofisticado de especiarias quentes e perfumadas que traz profundidade aos pratos orientais.",
        imagem:
          "https://images.unsplash.com/photo-1599909533681-74046848292b?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Zaatar",
        categoria: "Internacionais",
        linhaExibicao: "Temperos Internacionais",
        descricao:
          "Tempero tradicional do Oriente Médio com notas herbais e tostadas para pães, azeites, coalhadas e carnes.",
        imagem:
          "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=700&q=80"
      },
  
      // LINHA 4 — MULTIUSO (5)
      {
        nome: "Canela em pau/pó",
        categoria: "Multiuso",
        linhaExibicao: "Linha Multiuso",
        descricao:
          "Aroma doce e acolhedor indispensável em sobremesas, frutas, cafés, chás e receitas especiais.",
        imagem:
          "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Cravo-da-índia",
        categoria: "Multiuso",
        linhaExibicao: "Linha Multiuso",
        descricao:
          "Especiaria intensa e perfumada utilizada em doces tradicionais, caldas, infusões e assados festivos.",
        imagem:
          "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Noz-moscada",
        categoria: "Multiuso",
        linhaExibicao: "Linha Multiuso",
        descricao:
          "Toque refinado e levemente adocicado para molho branco, purês, massas recheadas e confeitaria.",
        imagem:
          "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Anis-estrelado",
        categoria: "Multiuso",
        linhaExibicao: "Linha Multiuso",
        descricao:
          "Especiaria aromática de notas suaves de alcaçuz, ideal para chás, bebidas quentes, caldas e marinadas.",
        imagem:
          "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=700&q=80"
      },
      {
        nome: "Gengibre",
        categoria: "Multiuso",
        linhaExibicao: "Linha Multiuso",
        descricao:
          "Sabor cítrico e picante muito versátil para infusões, sucos, biscoitos, carnes e pratos orientais.",
        imagem:
          "https://images.unsplash.com/photo-1626197031507-c17099753214?auto=format&fit=crop&w=700&q=80"
      }
    ];
  
    const productsGrid = document.getElementById("productsGrid");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const categoryDescription = document.getElementById("categoryDescription");
  
    function renderProducts(category = "todos") {
      if (!productsGrid) return;
  
      const filtered =
        category === "todos"
          ? produtos
          : produtos.filter((item) => item.categoria === category);
  
      productsGrid.classList.add("is-updating");
  
      window.setTimeout(() => {
        productsGrid.innerHTML = filtered
          .map(
            (produto) => `
            <article class="product-card">
              <div class="product-card__media">
                <img
                  src="${produto.imagem}"
                  alt="${produto.nome} — ${produto.linhaExibicao} Tempero Maneiro"
                  class="product-card__image"
                  loading="lazy"
                />
                <span class="product-card__badge" data-line="${produto.categoria}">
                  ${produto.linhaExibicao}
                </span>
              </div>
              <div class="product-card__body">
                <span class="product-card__line">${produto.linhaExibicao}</span>
                <h3 class="product-card__title">${produto.nome}</h3>
                <p class="product-card__desc">${produto.descricao}</p>
              </div>
            </article>
          `
          )
          .join("");
  
        if (categoryDescription && categoryDescriptions[category]) {
          categoryDescription.textContent = categoryDescriptions[category];
        }
  
        productsGrid.classList.remove("is-updating");
      }, 150);
    }
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter || "todos";
  
        filterButtons.forEach((btn) => {
          const isCurrent = btn === button;
          btn.classList.toggle("active", isCurrent);
          btn.setAttribute("aria-pressed", String(isCurrent));
        });
  
        renderProducts(selectedFilter);
      });
    });
  
    renderProducts("todos");
  
    // =========================================================
    // 4. VALIDAÇÃO DO FORMULÁRIO COMERCIAL
    // =========================================================
    const commercialForm = document.getElementById("commercialForm");
    const formFeedback = document.getElementById("formFeedback");
  
    const validators = {
      nomeCompleto: (value) => {
        if (!value.trim()) return "Por favor, informe seu nome completo.";
        if (value.trim().length < 3) return "Digite pelo menos 3 caracteres.";
        return "";
      },
      nomeEmpresa: (value) => {
        if (!value.trim()) return "Por favor, informe o nome da empresa.";
        return "";
      },
      email: (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "Por favor, informe um e-mail comercial.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(trimmed)) return "Informe um endereço de e-mail válido.";
        return "";
      },
      telefone: (value) => {
        const digits = value.replace(/\D/g, "");
        if (!digits) return "Por favor, informe um telefone ou WhatsApp.";
        if (digits.length < 10 || digits.length > 11) {
          return "Informe um telefone válido com DDD (10 ou 11 dígitos).";
        }
        return "";
      },
      cidadeEstado: (value) => {
        if (!value.trim()) return "Por favor, informe a cidade e o estado.";
        return "";
      },
      tipoEstabelecimento: (value) => {
        if (!value.trim()) return "Selecione o tipo de estabelecimento.";
        return "";
      },
      mensagem: (value) => {
        if (!value.trim()) return "Por favor, escreva sua mensagem para a equipe comercial.";
        if (value.trim().length < 10) {
          return "Escreva uma mensagem um pouco mais detalhada (mínimo de 10 caracteres).";
        }
        return "";
      }
    };
  
    function showFieldError(fieldName, errorMessage) {
      const input = document.getElementById(fieldName);
      const errorSpan = document.getElementById(`erro-${fieldName}`);
      if (!input || !errorSpan) return;
  
      errorSpan.textContent = errorMessage;
      input.classList.toggle("is-invalid", Boolean(errorMessage));
      input.setAttribute("aria-invalid", String(Boolean(errorMessage)));
    }
  
    if (commercialForm) {
      // Validação em tempo real após interação
      Object.keys(validators).forEach((fieldName) => {
        const field = document.getElementById(fieldName);
        if (!field) return;
  
        field.addEventListener("blur", () => {
          const message = validators[fieldName](field.value);
          showFieldError(fieldName, message);
        });
  
        field.addEventListener("input", () => {
          if (field.classList.contains("is-invalid")) {
            const message = validators[fieldName](field.value);
            showFieldError(fieldName, message);
          }
        });
      });
  
      // Máscara leve de telefone
      const phoneInput = document.getElementById("telefone");
      if (phoneInput) {
        phoneInput.addEventListener("input", (event) => {
          let digits = event.target.value.replace(/\D/g, "").slice(0, 11);
          if (digits.length > 6) {
            event.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}`;
          } else if (digits.length > 2) {
            event.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
          } else {
            event.target.value = digits;
          }
        });
      }
  
      commercialForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        let firstInvalidField = null;
        let hasErrors = false;
  
        Object.keys(validators).forEach((fieldName) => {
          const field = document.getElementById(fieldName);
          if (!field) return;
  
          const errorMessage = validators[fieldName](field.value);
          showFieldError(fieldName, errorMessage);
  
          if (errorMessage) {
            hasErrors = true;
            if (!firstInvalidField) firstInvalidField = field;
          }
        });
  
        if (hasErrors) {
          if (formFeedback) {
            formFeedback.hidden = false;
            formFeedback.className = "form__feedback form__feedback--error";
            formFeedback.textContent =
              "Existem campos obrigatórios ou inválidos. Revise os avisos destacados acima.";
          }
          if (firstInvalidField) firstInvalidField.focus();
          return;
        }
  
        // Payload estruturado pronto para futura integração com API/backend
        const payload = {
          nomeCompleto: commercialForm.nomeCompleto.value.trim(),
          nomeEmpresa: commercialForm.nomeEmpresa.value.trim(),
          email: commercialForm.email.value.trim(),
          telefone: commercialForm.telefone.value.trim(),
          cidadeEstado: commercialForm.cidadeEstado.value.trim(),
          tipoEstabelecimento: commercialForm.tipoEstabelecimento.value,
          mensagem: commercialForm.mensagem.value.trim(),
          endpointIntegracao: commercialForm.dataset.apiEndpoint,
          dataValidacao: new Date().toISOString()
        };
  
        commercialForm.dispatchEvent(
          new CustomEvent("temperomaneiro:formValidated", { detail: payload })
        );
  
        commercialForm.reset();
  
        if (formFeedback) {
          formFeedback.hidden = false;
          formFeedback.className = "form__feedback form__feedback--success";
          formFeedback.textContent =
            "Dados validados com sucesso! Esta interface front-end está preparada para integração com o servidor de atendimento comercial da Tempero Maneiro (nenhum e-mail externo foi disparado nesta demonstração).";
        }
      });
    }
  
    // =========================================================
    // 5. ANIMAÇÕES SUAVES AO ROLAR A PÁGINA
    // =========================================================
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
  
      revealElements.forEach((el) => revealObserver.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add("is-visible"));
    }
  });