/**
 * Caroline Barros - Nutricionista (CRN 23555)
 * Interações e Animações GSAP + ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Registra plugins do GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Inicializa a Hero Animation e Scroll Effects
  initHeroAnimations();
  initHeaderScroll();
  initFloatingElements();
  initSmoothScroll();
  initBookingSystem();
  initMetricsCounter();
  initServicesAnimations();
  initFaqAccordion();
  initCtaLeavesAnimation();
});

/**
 * Animação de Entrada e Scroll Parallax da Hero
 */
function initHeroAnimations() {
  const heroSection = document.querySelector('#hero');
  if (!heroSection) return;

  // Timeline principal de carregamento da Hero
  const entranceTl = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 1 }
  });

  // 1. Header surge do topo
  entranceTl.from('#main-header', {
    y: -40,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out'
  });

  // 2. Título principal (Headline) com revelação em stagger
  entranceTl.from('.hero-title-line', {
    y: 35,
    opacity: 0,
    stagger: 0.18,
    duration: 1
  }, '-=0.5');

  // 3. Subheadline e botões CTAs
  entranceTl.from('.hero-subtitle', {
    y: 25,
    opacity: 0,
    duration: 0.8
  }, '-=0.6');

  entranceTl.from('.hero-cta-group', {
    y: 20,
    opacity: 0,
    duration: 0.8
  }, '-=0.5');

  // 4. Foto da Caroline Barros surge de baixo com escala cinematográfica
  entranceTl.from('.hero-photo-wrapper', {
    y: 60,
    opacity: 0,
    scale: 1.06,
    duration: 1.3,
    ease: 'power2.out'
  }, '-=1.2');

  // 7. Cards flutuantes entram com bounce suave
  entranceTl.from('.hero-floating-card', {
    scale: 0.7,
    y: 30,
    opacity: 0,
    stagger: 0.22,
    duration: 1,
    ease: 'back.out(1.6)'
  }, '-=0.8');

  // Configuração dos Efeitos de SCROLLTRIGGER na Hero (Parallax e Profundidade)
  initHeroScrollParallax();
}

/**
 * Efeitos de Scroll Parallax e Multi-camadas com ScrollTrigger
 */
function initHeroScrollParallax() {
  const hero = document.querySelector('#hero');
  if (!hero) return;

  // Timeline vinculada ao scroll da hero
  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      invalidateOnRefresh: true
    }
  });

  // 1. Textos da Hero fazem fade out suave e sobem sutilmente
  scrollTl.to('.hero-text-content', {
    y: -60,
    opacity: 0.15,
    ease: 'none'
  }, 0);

  // 2. Imagem da Caroline se desloca em velocidade suave (Parallax central)
  scrollTl.to('.hero-photo-img', {
    y: 40,
    scale: 0.96,
    ease: 'none'
  }, 0);

  // 3. Card Flutuante 1 (Esquerda) sobe mais rápido e gira levemente
  scrollTl.to('#card-float-1', {
    y: -110,
    x: -30,
    rotation: -4,
    ease: 'none'
  }, 0);

  // 4. Card Flutuante 2 (Direita) sobe em velocidade diferente
  scrollTl.to('#card-float-2', {
    y: -90,
    x: 25,
    rotation: 3,
    ease: 'none'
  }, 0);

  // 5. Folhas botânicas da Hero se movem com elegância no parallax (sem fade out)
  scrollTl.to('.hero-leaf-top', { y: -80, rotation: 15, ease: 'none' }, 0);
  scrollTl.to('.hero-leaf-mid', { y: -60, rotation: 12, ease: 'none' }, 0);
  scrollTl.to('.hero-leaf-bg1', { y: -30, ease: 'none' }, 0);
  scrollTl.to('.hero-leaf-bg2', { y: -35, ease: 'none' }, 0);
}

/**
 * Animação contínua e orgânica de flutuação (Levitação suave)
 */
function initFloatingElements() {
  // Flutuação Card 1
  gsap.to('#card-float-1', {
    y: '-=12',
    rotation: 1.2,
    duration: 3.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });

  // Flutuação Card 2 (defasada)
  gsap.to('#card-float-2', {
    y: '+=14',
    rotation: -1.5,
    duration: 3.8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 0.6
  });

  // Flutuação contínua e orgânica das folhas da Hero (Sempre visíveis e ativas)
  document.querySelectorAll('.hero-leaf').forEach((leaf, i) => {
    const randomY = 12 + ((i % 3) * 6);
    const randomRot = 7 + ((i % 2) * 5);
    const randomDuration = 3.6 + (i * 0.5);

    gsap.to(leaf, {
      y: `+=${randomY}`,
      rotation: `+=${randomRot}`,
      duration: randomDuration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.25
    });
  });
}

/**
 * Compactação e efeito de vidro no Header ao rolar
 */
function initHeaderScroll() {
  const header = document.querySelector('#main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Rolagem suave para links de âncora
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Sistema Completo de Agendamento Interativo
 * (Dia, Data, Hora, Modalidade, Dados e Integração WhatsApp)
 */
function initBookingSystem() {
  const modal = document.querySelector('#booking-modal');
  const modalDialog = document.querySelector('#booking-modal-dialog');
  const openButtons = document.querySelectorAll('.open-booking-modal, a[href="#agendamento"]');
  const closeButtons = document.querySelectorAll('.close-booking-modal');

  if (!modal) return;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Estado do Agendamento
  const bookingState = {
    modality: 'Online (Vídeo-chamada)',
    date: '',
    time: '14:00',
    name: '',
    phone: '',
    email: '',
    goal: 'Emagrecimento Saudável'
  };

  // 1. Abrir Modal com GSAP
  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.remove('hidden-modal');
    modal.classList.add('visible-modal');
    document.body.style.overflow = 'hidden';

    // Animação GSAP
    gsap.fromTo(modalDialog, 
      { scale: 0.9, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.6)' }
    );
  }

  // 2. Fechar Modal com GSAP
  function closeModal() {
    gsap.to(modalDialog, {
      scale: 0.95,
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.remove('visible-modal');
        modal.classList.add('hidden-modal');
        document.body.style.overflow = '';
      }
    });
  }

  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

  // Fechar ao clicar fora do diálogo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Fechar com tecla ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('visible-modal')) {
      closeModal();
    }
  });

  // 3. Gerador dos próximos dias úteis para seleção rápida
  const daysContainer = document.querySelector('#booking-days-container');
  const dateInput = document.querySelector('#booking-date-input');

  if (daysContainer && dateInput) {
    // Definir data mínima como hoje
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    dateInput.min = todayStr;

    // Gerar 5 próximos dias (excluindo domingo)
    daysContainer.innerHTML = '';
    let dayCount = 0;
    let checkDate = new Date(today);
    // Começar no próximo dia útil se for tarde, ou hoje
    if (checkDate.getHours() >= 17) {
      checkDate.setDate(checkDate.getDate() + 1);
    }

    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    while (dayCount < 5) {
      const dayOfWeek = checkDate.getDay();
      if (dayOfWeek !== 0) { // Não incluir domingo
        const formattedDate = checkDate.toISOString().split('T')[0];
        const dayName = dayCount === 0 ? 'Mais cedo' : weekdays[dayOfWeek];
        const dayNum = checkDate.getDate();
        const monthName = months[checkDate.getMonth()];

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `day-slot-btn px-3.5 py-2.5 rounded-xl border border-umber/15 text-center flex flex-col items-center justify-center shrink-0 ${dayCount === 0 ? 'selected' : 'bg-white'}`;
        btn.dataset.date = formattedDate;
        btn.innerHTML = `
          <span class="text-[10px] uppercase tracking-wider font-semibold opacity-80">${dayName}</span>
          <span class="text-sm font-bold my-0.5">${dayNum} ${monthName}</span>
        `;

        btn.addEventListener('click', () => {
          document.querySelectorAll('.day-slot-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          bookingState.date = formattedDate;
          dateInput.value = formattedDate;
          updateBookingSummary();
        });

        daysContainer.appendChild(btn);

        if (dayCount === 0) {
          bookingState.date = formattedDate;
          dateInput.value = formattedDate;
        }

        dayCount++;
      }
      checkDate.setDate(checkDate.getDate() + 1);
    }

    // Se o usuário mudar a data no campo de calendário tradicional
    dateInput.addEventListener('change', (e) => {
      bookingState.date = e.target.value;
      document.querySelectorAll('.day-slot-btn').forEach(b => {
        if (b.dataset.date === e.target.value) {
          b.classList.add('selected');
        } else {
          b.classList.remove('selected');
        }
      });
      updateBookingSummary();
    });
  }

  // 4. Seleção de Horários
  const timeButtons = document.querySelectorAll('.time-slot-btn');
  timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      timeButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      bookingState.time = btn.dataset.time;
      updateBookingSummary();
    });
  });

  // 5. Seleção de Modalidade
  const modalityRadios = document.querySelectorAll('input[name="booking-modality"]');
  modalityRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      bookingState.modality = e.target.value;
      updateBookingSummary();
    });
  });

  // 6. Atualização dos campos de texto
  const nameInput = document.querySelector('#booking-name');
  const phoneInput = document.querySelector('#booking-phone');
  const goalSelect = document.querySelector('#booking-goal');

  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      bookingState.name = e.target.value;
      updateBookingSummary();
    });
  }

  if (phoneInput) {
    // Máscara simples de telefone (XX) XXXXX-XXXX
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.substring(0, 11);
      if (v.length > 6) {
        v = `(${v.substring(0,2)}) ${v.substring(2,7)}-${v.substring(7)}`;
      } else if (v.length > 2) {
        v = `(${v.substring(0,2)}) ${v.substring(2)}`;
      }
      e.target.value = v;
      bookingState.phone = v;
      updateBookingSummary();
    });
  }

  if (goalSelect) {
    goalSelect.addEventListener('change', (e) => {
      bookingState.goal = e.target.value;
      updateBookingSummary();
    });
  }

  // 7. Atualização do Resumo em Tempo Real
  function updateBookingSummary() {
    const summaryBadge = document.querySelector('#booking-summary-text');
    if (!summaryBadge) return;

    // Formatar data para exibição (dd/mm/aaaa)
    let displayDate = bookingState.date;
    if (displayDate) {
      const parts = displayDate.split('-');
      if (parts.length === 3) {
        displayDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    summaryBadge.innerHTML = `
      <span class="font-semibold text-olive">${bookingState.modality}</span> • 
      <span class="font-bold text-umber">${displayDate || 'Data a definir'} às ${bookingState.time}</span>
    `;
  }

  // Chamada inicial de atualização
  updateBookingSummary();

  // 8. Envio / Confirmação via WhatsApp
  const confirmBtn = document.querySelector('#btn-confirm-booking');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (!bookingState.name || bookingState.name.trim() === '') {
        alert('Por favor, informe seu nome completo para prosseguir com o agendamento.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!bookingState.phone || bookingState.phone.trim().length < 10) {
        alert('Por favor, informe seu número de WhatsApp com DDD para contato.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      let formattedDate = bookingState.date;
      if (formattedDate) {
        const p = formattedDate.split('-');
        if (p.length === 3) formattedDate = `${p[2]}/${p[1]}/${p[0]}`;
      }

      // Monta mensagem personalizada
      const msg = `Olá, Dra. Caroline Barros!\n\n` +
        `Gostaria de confirmar minha consulta de Nutrição:\n\n` +
        `👤 *Nome:* ${bookingState.name}\n` +
        `📱 *WhatsApp:* ${bookingState.phone}\n` +
        `📍 *Modalidade:* ${bookingState.modality}\n` +
        `📅 *Data desejada:* ${formattedDate}\n` +
        `⏰ *Horário:* ${bookingState.time}\n` +
        `🎯 *Objetivo:* ${bookingState.goal}\n\n` +
        `Poderia verificar a disponibilidade e me passar as orientações para confirmação? Obrigado!`;

      const whatsappUrl = `https://wa.me/5571999999999?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');
      closeModal();
    });
  }

  // 9. Pré-selecionar objetivo ao clicar nos botões dos cards de serviço
  document.querySelectorAll('.service-card').forEach(card => {
    const cardTitle = card.querySelector('h3');
    const cardBtn = card.querySelector('.open-booking-modal');
    if (cardTitle && cardBtn && goalSelect) {
      cardBtn.addEventListener('click', () => {
        const titleText = cardTitle.innerText.toLowerCase();
        if (titleText.includes('mulher') || titleText.includes('hormônio')) {
          goalSelect.value = 'Saúde da Mulher (SOP, TPM, Menopausa, Fertilidade)';
        } else if (titleText.includes('intestinal') || titleText.includes('microbiota')) {
          goalSelect.value = 'Saúde Intestinal, Digestão & Microbiota';
        } else if (titleText.includes('emagrecimento')) {
          goalSelect.value = 'Emagrecimento Saudável & Composição Corporal';
        } else {
          goalSelect.value = 'Reeducação Alimentar e Relação com a Comida';
        }
        bookingState.goal = goalSelect.value;
        updateBookingSummary();
      });
    }
  });
}

/**
 * Animação dos Contadores Numéricos com GSAP ScrollTrigger
 */
function initMetricsCounter() {
  const metricsBar = document.querySelector('#metrics-bar');
  if (!metricsBar) return;

  const counters = document.querySelectorAll('.counter');
  
  ScrollTrigger.create({
    trigger: '#metrics-bar',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            counter.innerText = Math.floor(obj.val).toLocaleString('pt-BR');
          }
        });
      });

      // Animação de entrada sutil no container das métricas
      gsap.from('#metrics-bar', {
        y: 30,
        opacity: 0.5,
        duration: 1,
        ease: 'power3.out'
      });
    }
  });
}

/**
 * Animação em Cascata dos Cards de Serviços com Fallback de Segurança
 */
function initServicesAnimations() {
  const serviceCards = document.querySelectorAll('.service-card');
  if (!serviceCards.length) return;

  // Animação com GSAP fromTo e limpeza de propriedades inline
  gsap.fromTo(serviceCards, 
    { y: 35, opacity: 0 },
    {
      scrollTrigger: {
        trigger: '#servicos',
        start: 'top 90%',
        once: true,
        onEnter: () => {
          serviceCards.forEach(card => card.style.visibility = 'visible');
        }
      },
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out',
      clearProps: 'opacity,transform'
    }
  );

  // Fallback de segurança garantido: após 1 segundo, assegura que nenhum card fique oculto
  setTimeout(() => {
    serviceCards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.style.visibility = 'visible';
    });
  }, 1200);
}

// Recalcula ScrollTrigger assim que todas as imagens terminarem de carregar
window.addEventListener('load', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});

/**
 * FAQ Accordion Interativo
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Fecha os outros itens para manter o visual limpo
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Alterna o item clicado
      if (isOpen) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Animação das Folhas Flutuantes na Seção CTA (Referência do Usuário)
 */
function initCtaLeavesAnimation() {
  const ctaLeaves = document.querySelectorAll('.cta-leaf');
  if (!ctaLeaves.length) return;

  // Levitação orgânica contínua de cada folha com frequências independentes
  ctaLeaves.forEach((leaf, i) => {
    const yDistance = 12 + (i * 6);
    const rotDistance = 8 + (i * 4);
    const duration = 3.6 + (i * 0.8);

    gsap.to(leaf, {
      y: `+=${yDistance}`,
      rotation: `+=${rotDistance}`,
      duration: duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.4
    });
  });

  // Parallax suave ao rolar na seção de CTA
  const ctaSection = document.querySelector('#contato');
  if (ctaSection && typeof ScrollTrigger !== 'undefined') {
    gsap.to('.cta-leaf-top', {
      scrollTrigger: {
        trigger: '#contato',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      },
      y: -60,
      rotation: -15,
      ease: 'none'
    });

    gsap.to('.cta-leaf-left', {
      scrollTrigger: {
        trigger: '#contato',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      },
      y: -90,
      rotation: 20,
      ease: 'none'
    });

    gsap.to('.cta-leaf-right', {
      scrollTrigger: {
        trigger: '#contato',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.8
      },
      y: -75,
      rotation: -25,
      ease: 'none'
    });
  }
}
