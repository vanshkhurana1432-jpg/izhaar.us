import { useState, useRef, useEffect } from "react";

const JOIN_URL     = "https://forms.gle/ktJkLUC7UNBJeeir5";
const FEEDBACK_URL = "https://forms.gle/FyHvZBNV6mnUFGS79";
const INSTA_URL    = "https://www.instagram.com/izhaar.listens";

/* ── Izhaar signature palette ─────────────────────────────────────
   Saffron  #FF6B35 / #FF8C42    warm, energetic, Indian roots
   Violet   #7C3AED / #A78BFA    calm, safe, trustworthy
   Rose     #EC4899 / #F472B6    compassion, softness
   Mint     #10B981               hope, growth
   Slate    #1E293B               body text
──────────────────────────────────────────────────────────────── */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --saffron:#FF6B35; --saffron-l:#FF8C42; --saffron-bg:#FFF4EE;
    --violet:#7C3AED;  --violet-l:#A78BFA;  --violet-bg:#F5F0FF;
    --rose:#EC4899;    --rose-l:#F472B6;    --rose-bg:#FFF0F7;
    --mint:#10B981;    --mint-bg:#ECFDF5;
    --amber:#F59E0B;
    --slate:#1E293B; --gray:#64748B; --gray-l:#94A3B8;
    --f:'Inter',sans-serif; --fq:'Playfair Display',serif;
    --sh:0 2px 12px rgba(0,0,0,.06); --sh-md:0 8px 32px rgba(0,0,0,.10);
    --grad:linear-gradient(135deg,#FF6B35,#EC4899,#7C3AED);
    --grad-soft:linear-gradient(135deg,#FFF4EE,#FFF0F7,#F5F0FF);
  }
  html{scroll-behavior:smooth;}
  body{font-family:var(--f);background:#fff;color:var(--slate);line-height:1.6;-webkit-text-size-adjust:100%;}
  ::selection{background:rgba(255,107,53,.18);color:var(--slate);}
  ::-webkit-scrollbar{width:6px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#FF6B35,#7C3AED);border-radius:3px;}
  img,svg{max-width:100%;display:block;}
  a{color:inherit;}
  button{cursor:pointer;}

  /* ── SPLASH SCREEN ── */
  .splash{position:fixed;inset:0;background:#fff;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;animation:splashOut .5s ease 2.2s forwards;}
  @keyframes splashOut{to{opacity:0;pointer-events:none;}}
  .splash-logo{width:80px;height:80px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:2.2rem;animation:popIn .6s cubic-bezier(.34,1.56,.64,1) .2s both,logoSpin 3s ease-in-out .8s forwards;}
  @keyframes popIn{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
  @keyframes logoSpin{0%{transform:scale(1) rotate(0)}50%{transform:scale(1.08) rotate(8deg)}100%{transform:scale(1) rotate(0)}}
  .splash-name{font-size:2.4rem;font-weight:900;letter-spacing:.08em;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:fadeUp .5s ease .5s both;}
  .splash-tag{font-size:.95rem;color:var(--gray);font-weight:500;animation:fadeUp .5s ease .8s both;letter-spacing:.02em;}
  .splash-dots{display:flex;gap:8px;margin-top:8px;animation:fadeUp .5s ease 1s both;}
  .splash-dot{width:8px;height:8px;border-radius:50%;background:var(--grad);}
  .splash-dot:nth-child(1){animation:bounce 1.2s ease 1.2s infinite;}
  .splash-dot:nth-child(2){animation:bounce 1.2s ease 1.4s infinite;}
  .splash-dot:nth-child(3){animation:bounce 1.2s ease 1.6s infinite;}
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes arrowBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}

  /* ── NAV ── */
  /* ── NAV ── */
  .nav{
    position:sticky;top:0;z-index:200;
    background:rgba(255,255,255,.96);
    backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
    border-bottom:1px solid rgba(240,232,255,.8);
    height:68px;padding:0 48px;
    display:flex;align-items:center;justify-content:space-between;
    transition:box-shadow .2s;
  }
  .nav.scrolled{box-shadow:0 4px 24px rgba(124,58,237,.08);}

  /* Logo */
  .logo{display:flex;align-items:center;gap:12px;cursor:pointer;text-decoration:none;}
  .logo-icon{
    width:42px;height:42px;border-radius:14px;
    background:var(--grad);
    display:flex;align-items:center;justify-content:center;
    font-size:1.15rem;
    box-shadow:0 4px 14px rgba(255,107,53,.28);
    transition:transform .2s,box-shadow .2s;
  }
  .logo:hover .logo-icon{transform:scale(1.08);box-shadow:0 6px 20px rgba(255,107,53,.38);}
  .logo-text{display:flex;flex-direction:column;line-height:1;}
  .logo-name{
    font-weight:900;font-size:1.18rem;letter-spacing:.04em;
    background:var(--grad);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  }
  .logo-tag{font-size:.63rem;color:var(--gray-l);font-weight:500;letter-spacing:.03em;margin-top:2px;}

  /* Center pills */
  .nav-center{display:flex;align-items:center;gap:2px;background:#F8F5FF;padding:4px;border-radius:50px;border:1px solid #EDE8FF;}
  .nav-pill{
    display:flex;align-items:center;gap:6px;
    padding:7px 16px;border-radius:50px;border:none;
    background:transparent;color:var(--gray);
    font-size:.85rem;font-weight:500;
    cursor:pointer;transition:all .18s;font-family:var(--f);
    white-space:nowrap;
  }
  .nav-pill:hover{color:var(--violet);}
  .nav-pill.active{background:#fff;color:var(--violet);font-weight:700;box-shadow:0 2px 8px rgba(124,58,237,.12);}

  /* Right side */
  .nav-right{display:flex;align-items:center;gap:12px;}

  /* Instagram */
  .nav-insta{
    display:flex;align-items:center;gap:7px;
    padding:8px 16px;border-radius:50px;
    border:1.5px solid #EDE8FF;
    background:#fff;
    text-decoration:none;
    color:var(--gray);font-size:.85rem;font-weight:600;
    font-family:var(--f);
    flex-shrink:0;transition:all .2s;
    white-space:nowrap;
  }
  .nav-insta:hover{
    border-color:var(--rose);color:var(--rose);
    background:var(--rose-bg);
    transform:translateY(-1px);
    box-shadow:0 4px 12px rgba(236,72,153,.15);
  }
  .nav-insta-dot{
    width:8px;height:8px;border-radius:50%;
    background:linear-gradient(135deg,#F472B6,#A78BFA);
    flex-shrink:0;
  }

  /* Join Us CTA */
  .nav-join{
    display:flex;align-items:center;gap:8px;
    padding:10px 22px;border-radius:50px;border:none;
    background:var(--grad);color:#fff;
    font-size:.875rem;font-weight:700;letter-spacing:.01em;
    cursor:pointer;font-family:var(--f);
    box-shadow:0 4px 16px rgba(255,107,53,.3);
    transition:all .22s;
    position:relative;overflow:hidden;
  }
  .nav-join::before{
    content:'';position:absolute;inset:0;
    background:rgba(255,255,255,.15);
    transform:translateX(-100%);transition:transform .3s;
  }
  .nav-join:hover::before{transform:translateX(0);}
  .nav-join:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(255,107,53,.42);}
  .nav-join:active{transform:translateY(0);}
  .nav-join-icon{font-size:1rem;transition:transform .2s;}
  .nav-join:hover .nav-join-icon{transform:rotate(15deg);}

  /* Hamburger */
  .ham-btn{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;border-radius:8px;transition:background .15s;}
  .ham-btn:hover{background:#F1F5F9;}
  .ham-line{display:block;width:22px;height:2px;background:var(--slate);border-radius:2px;transition:all .25s;}
  .ham-btn.open .ham-line:nth-child(1){transform:translateY(7px) rotate(45deg);}
  .ham-btn.open .ham-line:nth-child(2){opacity:0;transform:scaleX(0);}
  .ham-btn.open .ham-line:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
  .mobile-drawer{display:none;position:fixed;top:64px;left:0;right:0;bottom:0;background:rgba(255,255,255,.99);backdrop-filter:blur(20px);z-index:190;flex-direction:column;padding:24px 20px;gap:8px;overflow-y:auto;animation:slideDown .22s ease;}
  @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
  .mobile-drawer.open{display:flex;}
  .drawer-pill{display:flex;align-items:center;gap:12px;padding:14px 18px;border-radius:14px;border:none;background:transparent;color:var(--slate);font-size:1rem;font-weight:600;cursor:pointer;font-family:var(--f);text-align:left;width:100%;transition:background .15s;min-height:52px;}
  .drawer-pill:hover,.drawer-pill.active{background:var(--violet-bg);color:var(--violet);}
  .drawer-divider{height:1px;background:#F0E8FF;margin:8px 0;}
  .drawer-insta{display:flex;align-items:center;gap:12px;padding:14px 18px;border-radius:14px;color:var(--slate);font-size:1rem;font-weight:600;text-decoration:none;font-family:var(--f);min-height:52px;}
  .drawer-insta:hover{background:var(--rose-bg);}
  .drawer-join{margin-top:8px;padding:14px;border-radius:50px;border:none;background:var(--grad);color:#fff;font-size:1rem;font-weight:700;cursor:pointer;font-family:var(--f);text-align:center;width:100%;min-height:52px;box-shadow:0 4px 16px rgba(255,107,53,.3);}

  /* ── HERO ── */
  .hero{background:var(--grad-soft);padding:88px 40px 72px;text-align:center;position:relative;overflow:hidden;}
  .orb{position:absolute;border-radius:50%;pointer-events:none;}
  .orb-tl{top:-100px;left:-80px;width:420px;height:420px;background:radial-gradient(circle,rgba(255,107,53,.10) 0%,transparent 65%);}
  .orb-tr{top:-80px;right:-60px;width:380px;height:380px;background:radial-gradient(circle,rgba(236,72,153,.09) 0%,transparent 65%);}
  .orb-b{bottom:-60px;left:50%;transform:translateX(-50%);width:500px;height:180px;background:radial-gradient(ellipse,rgba(124,58,237,.08) 0%,transparent 70%);}
  .hero-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.9);border:1.5px solid #FFD4C2;border-radius:50px;padding:7px 18px;font-size:.82rem;font-weight:500;color:var(--gray);margin-bottom:28px;box-shadow:0 2px 8px rgba(255,107,53,.08);}
  .hero h1{font-size:clamp(2.2rem,5vw,3.8rem);font-weight:900;color:var(--slate);line-height:1.1;margin-bottom:16px;letter-spacing:-.025em;}
  .t-saffron{background:linear-gradient(135deg,var(--saffron),var(--saffron-l));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .t-grad{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .hero-sub{font-size:1.15rem;font-weight:700;color:var(--violet);margin-bottom:14px;letter-spacing:.01em;}
  .hero-desc{max-width:560px;margin:0 auto 40px;color:var(--gray);font-size:1rem;line-height:1.75;}
  .hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
  .btn-primary{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:50px;border:none;background:var(--grad);color:#fff;font-size:.97rem;font-weight:700;cursor:pointer;font-family:var(--f);transition:all .22s;box-shadow:0 6px 20px rgba(255,107,53,.32);}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(255,107,53,.42);}
  .btn-outline{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:50px;border:2px solid var(--violet);background:#fff;color:var(--violet);font-size:.97rem;font-weight:700;cursor:pointer;font-family:var(--f);transition:all .22s;}
  .btn-outline:hover{background:var(--violet-bg);transform:translateY(-1px);}

  /* ── QUOTE BANDS ── */
  .quote-band{padding:52px 40px;text-align:center;position:relative;overflow:hidden;}
  .qb-saffron{background:linear-gradient(135deg,#FFF4EE,#FFF0F7);}
  .qb-violet {background:linear-gradient(135deg,#F5F0FF,#FFF0F7);}
  .qb-rose   {background:linear-gradient(135deg,#FFF0F7,#FFF4EE);}
  .quote-mark{font-size:5rem;line-height:.5;color:rgba(255,107,53,.12);font-family:Georgia,serif;display:block;margin-bottom:8px;}
  .quote-text{font-family:var(--fq);font-size:clamp(1.15rem,2.5vw,1.6rem);font-style:italic;color:var(--slate);max-width:680px;margin:0 auto 14px;line-height:1.5;}
  .quote-attr{font-size:.8rem;color:var(--gray-l);font-weight:500;letter-spacing:.5px;text-transform:uppercase;}

  /* ── FLOWCHART ── */
  .flow-section{background:#fff;padding:80px 40px;}
  .flow-inner{max-width:900px;margin:0 auto;}
  .sec-eyebrow{display:inline-block;background:var(--saffron-bg);color:var(--saffron);padding:5px 16px;border-radius:50px;font-size:.76rem;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:14px;}
  .sec-title{font-size:1.75rem;font-weight:800;color:var(--slate);margin-bottom:10px;letter-spacing:-.015em;}
  .sec-desc{color:var(--gray);font-size:.93rem;max-width:480px;line-height:1.65;margin-bottom:48px;}
  .flow-steps{display:flex;flex-direction:column;}
  .flow-row{display:flex;align-items:stretch;position:relative;}
  .flow-left{width:50%;padding-right:40px;display:flex;flex-direction:column;align-items:flex-end;padding-bottom:40px;}
  .flow-right{width:50%;padding-left:40px;padding-bottom:40px;}
  .flow-center{width:2px;background:linear-gradient(180deg,#FFD4C2,#DDD6FE,#FBCFE8);flex-shrink:0;position:relative;display:flex;justify-content:center;}
  .flow-dot{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;position:absolute;top:0;left:50%;transform:translateX(-50%);border:3px solid #fff;box-shadow:0 4px 16px rgba(0,0,0,.12);z-index:2;}
  .fd-s{background:linear-gradient(135deg,#FFD4C2,#FFB89A);}
  .fd-v{background:linear-gradient(135deg,#EDE9FE,#DDD6FE);}
  .fd-r{background:linear-gradient(135deg,#FCE7F3,#FBCFE8);}
  .fd-g{background:linear-gradient(135deg,#D1FAE5,#A7F3D0);}
  .fd-a{background:linear-gradient(135deg,#FEF3C7,#FDE68A);}
  .fd-t{background:linear-gradient(135deg,#CFFAFE,#A5F3FC);}
  .flow-card{background:#FAFAFA;border:1.5px solid #F0E8FF;border-radius:18px;padding:20px 22px;max-width:340px;}
  .flow-card.alt{background:var(--saffron-bg);border-color:#FFD4C2;}
  .flow-card h3{font-size:.97rem;font-weight:700;color:var(--slate);margin-bottom:6px;}
  .flow-card p{font-size:.82rem;color:var(--gray);line-height:1.6;}
  .flow-tag{display:inline-block;font-size:.7rem;font-weight:700;padding:3px 10px;border-radius:50px;margin-bottom:8px;}
  .ft-s{background:#FFD4C2;color:#C2410C;}
  .ft-v{background:#EDE9FE;color:#6D28D9;}
  .ft-r{background:#FCE7F3;color:#BE185D;}
  .ft-g{background:#D1FAE5;color:#065F46;}
  .ft-a{background:#FEF3C7;color:#92400E;}
  .ft-t{background:#CFFAFE;color:#0E7490;}

  /* Mobile flowchart — 3-step simplified */
  .flow-simple{display:none;flex-direction:column;gap:0;align-items:center;}
  .flow-simple-step{display:flex;flex-direction:column;align-items:center;text-align:center;}
  .flow-simple-dot{width:56px;height:56px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:1.5rem;box-shadow:0 4px 16px rgba(255,107,53,.28);margin-bottom:12px;}
  .flow-simple-line{width:2px;height:40px;background:linear-gradient(180deg,#FFB89A,#DDD6FE);margin:0 auto;}
  .flow-simple-card{background:#fff;border:1.5px solid #F0E8FF;border-radius:16px;padding:18px 20px;max-width:300px;width:100%;margin-bottom:4px;}
  .flow-simple-card h3{font-size:1rem;font-weight:700;color:var(--slate);margin-bottom:6px;}
  .flow-simple-card p{font-size:.83rem;color:var(--gray);line-height:1.55;}

  /* ── HIW ── */
  .hiw{background:var(--grad-soft);padding:72px 40px;}
  .hiw-inner{max-width:960px;margin:0 auto;}
  .hiw-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .hiw-card{background:#fff;border:1.5px solid #F0E8FF;border-radius:20px;padding:28px 24px;text-align:center;transition:all .22s;}
  .hiw-card:hover{transform:translateY(-4px);box-shadow:var(--sh-md);}
  .hiw-icon{font-size:2.2rem;display:block;margin-bottom:14px;}
  .hiw-card h3{font-size:.97rem;font-weight:700;color:var(--slate);margin-bottom:8px;}
  .hiw-card p{font-size:.82rem;color:var(--gray);line-height:1.62;}

  /* ── TESTIMONIALS ── */
  .testi-section{background:#fff;padding:72px 40px;}
  .testi-inner{max-width:960px;margin:0 auto;}
  .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px;}
  .testi-card{background:var(--grad-soft);border:1.5px solid #F0E8FF;border-radius:18px;padding:22px;transition:transform .2s;}
  .testi-card:hover{transform:translateY(-3px);box-shadow:var(--sh-md);}
  .testi-quote{font-size:.9rem;color:var(--slate);line-height:1.65;margin-bottom:14px;font-style:italic;}
  .testi-mood{display:inline-flex;align-items:center;gap:6px;font-size:.75rem;font-weight:700;padding:4px 12px;border-radius:50px;}
  .tm-okay {background:#EFF6FF;color:#1D4ED8;}
  .tm-sad  {background:var(--violet-bg);color:var(--violet);}
  .tm-notok{background:var(--rose-bg);color:#9F1239;}

  /* ── FEEDBACK ── */
  .feedback-section{background:var(--grad);padding:72px 40px;text-align:center;position:relative;overflow:hidden;}
  .feedback-section::before{content:'';position:absolute;top:-80px;right:-80px;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,.07);}
  .feedback-section::after{content:'';position:absolute;bottom:-80px;left:-60px;width:260px;height:260px;border-radius:50%;background:rgba(255,255,255,.05);}
  .feedback-inner{max-width:640px;margin:0 auto;position:relative;z-index:1;}
  .feedback-stars{display:flex;gap:6px;justify-content:center;margin-bottom:16px;font-size:1.6rem;}
  .feedback-icon{font-size:3rem;display:block;margin-bottom:16px;}
  .feedback-section h2{font-size:1.8rem;font-weight:900;color:#fff;margin-bottom:12px;letter-spacing:-.015em;}
  .feedback-section p{color:rgba(255,255,255,.88);font-size:.97rem;line-height:1.72;margin-bottom:32px;}
  .feedback-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 32px;border-radius:50px;border:none;background:#fff;color:var(--violet);font-size:1rem;font-weight:700;cursor:pointer;font-family:var(--f);box-shadow:0 6px 20px rgba(0,0,0,.15);transition:all .22s;text-decoration:none;}
  .feedback-btn:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,0,0,.20);}

  /* ── JOIN PAGE ── */
  .join-page{padding:64px 40px;background:var(--grad-soft);min-height:80vh;}
  .join-inner{max-width:660px;margin:0 auto;}
  .join-header{text-align:center;margin-bottom:40px;}
  .join-header h1{font-size:1.9rem;font-weight:900;color:var(--slate);margin-bottom:10px;letter-spacing:-.02em;}
  .join-header p{color:var(--gray);font-size:.97rem;max-width:480px;margin:0 auto;line-height:1.7;}
  .volunteer-card{background:#fff;border-radius:24px;padding:40px 36px;border:2.5px solid #F0E8FF;box-shadow:0 8px 40px rgba(124,58,237,.10);transition:all .25s;position:relative;overflow:hidden;}
  .volunteer-card::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:var(--grad-soft);}
  .volunteer-card:hover{border-color:var(--violet-l);box-shadow:0 16px 56px rgba(124,58,237,.18);transform:translateY(-3px);}
  .vc-badge{display:inline-block;padding:5px 16px;border-radius:50px;font-size:.72rem;font-weight:700;letter-spacing:.4px;margin-bottom:20px;background:var(--saffron-bg);color:var(--saffron);}
  .vc-icon{font-size:3rem;display:block;margin-bottom:18px;}
  .vc-title{font-size:1.4rem;font-weight:800;color:var(--slate);margin-bottom:10px;}
  .vc-desc{font-size:.9rem;color:var(--gray);line-height:1.7;margin-bottom:24px;}
  .vc-perks{list-style:none;margin-bottom:32px;}
  .vc-perks li{display:flex;align-items:flex-start;gap:10px;font-size:.87rem;color:var(--slate);margin-bottom:12px;}
  .vc-check{width:22px;height:22px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:.65rem;color:#fff;flex-shrink:0;margin-top:1px;}
  .vc-btn{width:100%;padding:15px;border-radius:50px;border:none;background:var(--grad);color:#fff;font-weight:700;font-size:1rem;cursor:pointer;font-family:var(--f);transition:all .2s;box-shadow:0 4px 16px rgba(255,107,53,.30);}
  .vc-btn:hover{opacity:.9;transform:translateY(-1px);}
  .join-note{background:#fff;border-radius:16px;padding:20px 24px;border:1.5px solid #F0E8FF;display:flex;align-items:center;gap:14px;box-shadow:var(--sh);margin-top:24px;}
  .join-note-icon{font-size:1.6rem;flex-shrink:0;}
  .join-note-text h4{font-size:.9rem;font-weight:700;color:var(--slate);margin-bottom:4px;}
  .join-note-text p{font-size:.8rem;color:var(--gray);line-height:1.55;}

  /* ── FEED PAGE ── */
  .page{padding:56px 40px;min-height:72vh;}
  .page-bg-pink{background:linear-gradient(160deg,var(--rose-bg),#FFF4EE);}
  .page-title{font-size:1.7rem;font-weight:900;color:var(--slate);margin-bottom:6px;letter-spacing:-.02em;}
  .page-sub{color:var(--gray);font-size:.92rem;margin-bottom:36px;}
  .inner{max-width:900px;margin:0 auto;}
  .feed-compose{background:#fff;border-radius:16px;padding:20px;box-shadow:var(--sh);margin-bottom:18px;border:1.5px solid #FFD4C2;}
  .feed-lbl{font-size:.85rem;font-weight:700;color:var(--slate);margin-bottom:10px;}
  .feed-inp{width:100%;padding:10px 16px;border-radius:50px;border:1.5px solid #FFD4C2;font-family:var(--f);font-size:.87rem;outline:none;margin-bottom:10px;}
  .feed-inp:focus{border-color:var(--saffron);}
  .feed-sub{padding:10px 22px;border-radius:50px;border:none;background:var(--grad);color:#fff;font-weight:700;cursor:pointer;font-family:var(--f);}
  .feed-list{display:flex;flex-direction:column;gap:10px;}
  .feed-item{background:#fff;border-radius:14px;padding:16px 18px;box-shadow:var(--sh);display:flex;gap:12px;border-left:3px solid var(--saffron);}
  .feed-av{width:38px;height:38px;border-radius:50%;background:var(--saffron-bg);display:flex;align-items:center;justify-content:center;font-size:1.15rem;flex-shrink:0;}
  .feed-who{font-size:.74rem;color:var(--saffron);font-weight:700;margin-bottom:3px;}
  .feed-txt{font-size:.88rem;color:var(--slate);line-height:1.52;}

  /* ── FEEDBACK PAGE ── */
  .page-bg-violet{background:linear-gradient(160deg,var(--violet-bg),var(--rose-bg));}

  /* ── TRUST ── */
  .trust{background:var(--saffron-bg);padding:28px 40px 56px;}
  .trust-inner{max-width:720px;margin:0 auto;display:flex;justify-content:center;gap:48px;flex-wrap:wrap;}
  .trust-item{display:flex;align-items:center;gap:9px;color:var(--gray);font-size:.87rem;font-weight:500;}

  /* ── FOOTER ── */
  .footer{background:var(--slate);padding:48px 40px;text-align:center;}
  .foot-logo{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:12px;}
  .foot-logo-icon{width:38px;height:38px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:1rem;}
  .foot-logo-name{font-weight:900;font-size:1.15rem;letter-spacing:.06em;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .foot-tagline{color:rgba(255,255,255,.7);font-size:.93rem;margin-bottom:6px;font-style:italic;}
  .foot-sub{color:rgba(255,255,255,.4);font-size:.78rem;}
  .foot-links{display:flex;justify-content:center;gap:24px;margin-top:20px;flex-wrap:wrap;}
  .foot-links a{color:rgba(255,255,255,.5);font-size:.8rem;cursor:pointer;text-decoration:none;transition:color .15s;}
  .foot-links a:hover{color:#fff;}

  /* ── MODALS ── */
  .ov{position:fixed;inset:0;background:rgba(30,10,50,.35);backdrop-filter:blur(8px);z-index:400;display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn .2s;}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .modal{background:#fff;border-radius:24px;padding:32px;max-width:480px;width:100%;box-shadow:0 24px 80px rgba(124,58,237,.20);animation:slideUp .22s ease;max-height:90vh;overflow-y:auto;-webkit-overflow-scrolling:touch;}
  @keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
  .m-title{font-size:1.1rem;font-weight:900;color:var(--slate);margin-bottom:8px;}
  .m-p{color:var(--gray);font-size:.87rem;line-height:1.65;margin-bottom:16px;}
  .m-action{width:100%;padding:12px;border-radius:50px;border:none;background:var(--grad);color:#fff;font-weight:700;cursor:pointer;font-family:var(--f);font-size:.95rem;margin-bottom:8px;display:flex;align-items:center;justify-content:center;gap:8px;}
  .m-close{width:100%;padding:10px;border-radius:50px;border:none;background:#F1F5F9;color:var(--slate);font-weight:600;cursor:pointer;font-family:var(--f);font-size:.9rem;}
  .m-close:hover{background:#E2E8F0;}
  .mood-step-title{font-size:1.05rem;font-weight:800;color:var(--slate);margin-bottom:5px;text-align:center;}
  .mood-step-sub{font-size:.83rem;color:var(--gray);text-align:center;margin-bottom:18px;}
  .mood-pick-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:14px;}
  .mood-pick-card{border-radius:14px;padding:15px 12px;cursor:pointer;transition:all .2s;border:2px solid transparent;text-align:left;}
  .mood-pick-card:hover{transform:translateY(-3px);}
  .mp-happy{background:#FFFBEB;border-color:#FDE68A;} .mp-happy:hover{border-color:#F59E0B;}
  .mp-okay {background:#EFF6FF;border-color:#BFDBFE;} .mp-okay:hover{border-color:#3B82F6;}
  .mp-sad  {background:var(--violet-bg);border-color:#DDD6FE;} .mp-sad:hover{border-color:var(--violet);}
  .mp-notok{background:var(--rose-bg);border-color:#FECDD3;} .mp-notok:hover{border-color:var(--rose);}
  .mp-emoji{font-size:1.7rem;display:block;margin-bottom:8px;}
  .mp-name{font-size:.88rem;font-weight:700;margin-bottom:2px;}
  .mp-desc{font-size:.72rem;color:var(--gray);line-height:1.4;}
  .mf-group{margin-bottom:12px;}
  .mf-label{font-size:.79rem;font-weight:700;color:var(--gray);margin-bottom:5px;display:block;}
  .mf-inp{width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid #E2E8F0;font-family:var(--f);font-size:.88rem;outline:none;transition:border-color .18s;background:#FAFAFA;}
  .mf-inp:focus{border-color:var(--violet);background:#fff;}
  .mf-submit{width:100%;padding:13px;border-radius:50px;border:none;background:var(--grad);color:#fff;font-weight:700;cursor:pointer;font-family:var(--f);font-size:.93rem;margin-top:4px;min-height:48px;}
  .mf-back{width:100%;padding:10px;border-radius:50px;border:none;background:#F1F5F9;color:var(--gray);font-weight:600;cursor:pointer;font-family:var(--f);font-size:.86rem;margin-top:8px;min-height:44px;}
  .mf-back:hover{background:#E2E8F0;}
  .two-choice{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;}
  .choice-btn{border-radius:16px;padding:20px 14px;text-align:center;cursor:pointer;border:2px solid transparent;transition:all .22s;font-family:var(--f);}
  .choice-btn:hover{transform:translateY(-4px);box-shadow:var(--sh-md);}
  .ch-meet{background:#EFF6FF;border-color:#BFDBFE;} .ch-meet:hover{border-color:#3B82F6;}
  .ch-chat{background:var(--violet-bg);border-color:#DDD6FE;} .ch-chat:hover{border-color:var(--violet);}
  .ch-icon{font-size:1.8rem;display:block;margin-bottom:9px;}
  .ch-label{font-weight:700;font-size:.9rem;margin-bottom:4px;}
  .ch-meet .ch-label{color:#1D4ED8;} .ch-chat .ch-label{color:var(--violet);}
  .ch-desc{font-size:.72rem;color:var(--gray);line-height:1.4;}
  .success-icon{font-size:2.8rem;text-align:center;display:block;margin-bottom:10px;}
  .meet-result{background:#EFF6FF;border:1.5px solid #BFDBFE;border-radius:14px;padding:16px;margin-bottom:14px;}
  .meet-result-label{font-size:.72rem;font-weight:700;color:var(--gray-l);text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px;}
  .meet-result-link{font-size:.9rem;font-weight:700;color:#2563EB;word-break:break-all;}
  .priv-note{background:var(--mint-bg);border:1.5px solid #A7F3D0;border-radius:10px;padding:9px 13px;font-size:.76rem;color:#065F46;font-weight:600;margin-bottom:12px;}
  .happy-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;}
  .happy-card{border-radius:13px;padding:15px;border:1.5px solid #FFD4C2;background:var(--saffron-bg);text-align:center;cursor:pointer;transition:all .18s;}
  .happy-card:hover{border-color:var(--saffron);transform:translateY(-2px);}
  .happy-card h4{font-size:.87rem;font-weight:700;color:#C2410C;margin-bottom:3px;}
  .happy-card p{font-size:.74rem;color:var(--gray);line-height:1.4;}
  .vf-note{background:var(--mint-bg);border:1.5px solid #A7F3D0;border-radius:10px;padding:10px 14px;font-size:.79rem;color:#065F46;font-weight:600;margin-bottom:18px;}
  .fg{margin-bottom:13px;}
  .fl{font-size:.8rem;font-weight:700;color:var(--gray);margin-bottom:5px;display:block;}
  .fi{width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid #E2E8F0;font-family:var(--f);font-size:.88rem;outline:none;transition:border-color .18s;background:#FAFAFA;}
  .fi:focus{border-color:var(--violet);background:#fff;}
  .fs{width:100%;padding:13px;border-radius:50px;border:none;background:var(--grad);color:#fff;font-weight:700;font-size:.95rem;cursor:pointer;font-family:var(--f);margin-top:4px;min-height:48px;}

  /* ── RESPONSIVE ── */
  @media(max-width:1024px){
    .nav{padding:0 28px;}
    .nav-pill{font-size:.8rem;padding:6px 13px;}
    .hero{padding:72px 24px 56px;}
    .flow-section,.hiw,.testi-section,.feedback-section,.trust,.page,.join-page,.quote-band{padding-left:24px;padding-right:24px;}
    .hiw-grid{grid-template-columns:repeat(2,1fr);}
    .testi-grid{grid-template-columns:repeat(2,1fr);}
    .flow-card{max-width:100%;}
  }
  @media(max-width:640px){
    .about-grid{grid-template-columns:1fr!important;}

    .nav{padding:0 16px;height:60px;}
    .nav-center,.nav-right .nav-join{display:none;}
    .nav-insta{padding:6px 12px;font-size:.8rem;}
    .ham-btn{display:flex;}
    .hero{padding:56px 16px 44px;}
    .hero h1{font-size:clamp(1.8rem,8vw,2.5rem);}
    .hero-btns{flex-direction:column;align-items:center;gap:10px;}
    .btn-primary,.btn-outline{width:100%;max-width:320px;justify-content:center;}
    /* Show 3-step mobile flow, hide desktop flow */
    .flow-steps{display:none;}
    .flow-simple{display:flex;}
    .flow-section{padding:48px 16px;}
    .sec-title{font-size:1.4rem;}
    .quote-band{padding:36px 16px;}
    .quote-text{font-size:1.05rem;}
    .hiw{padding:48px 16px;}
    .hiw-grid{grid-template-columns:1fr;gap:12px;}
    .testi-section{padding:48px 16px;}
    .testi-grid{grid-template-columns:1fr;gap:12px;}
    .feedback-section{padding:48px 16px;}
    .feedback-btn{width:100%;justify-content:center;}
    .join-page{padding:40px 16px;}
    .volunteer-card{padding:28px 20px;}
    .join-note{flex-direction:column;text-align:center;}
    .page{padding:40px 16px;}
    footer .foot-grid{grid-template-columns:1fr!important;}
    .trust{padding:24px 16px 40px;}
    .trust-inner{flex-direction:column;align-items:center;gap:18px;}
    .footer{padding:36px 16px;}
    .foot-links{gap:14px;}
    .modal{padding:24px 18px;border-radius:20px;}
    .two-choice{grid-template-columns:1fr;}
    .happy-grid{grid-template-columns:1fr 1fr;}
    .mf-inp,.fi{padding:12px 14px;font-size:1rem;}
    select.mf-inp,select.fi{font-size:1rem;}
  }
  /* Website feel extras */
  .section-divider{height:1px;background:linear-gradient(90deg,transparent,#F0E8FF,transparent);margin:0 40px;}
  @media(max-width:380px){
    .hero h1{font-size:1.6rem;}
    .happy-grid{grid-template-columns:1fr;}
    .mood-pick-grid{gap:6px;}
  }
`;

// ── data ────────────────────────────────────────────────────────
const FEED_INIT=[
  {id:1,e:"🌻",t:"Sending warmth to everyone feeling low tonight. You matter so much. ✨",w:"Anonymous"},
  {id:2,e:"🩵",t:"To whoever needs this — you are doing an amazing job just by showing up.",w:"Anonymous"},
  {id:3,e:"🌈",t:"One small step today is still a step forward. I believe in you!",w:"Anonymous"},
  {id:4,e:"🍀",t:"You are braver than you believe and stronger than you seem. 💚",w:"Anonymous"},
];
const MOODS=[
  {k:"happy",cls:"mp-happy",e:"😄",n:"Happy",   d:"Share something joyful",        nc:"#92400E"},
  {k:"okay", cls:"mp-okay", e:"🙂",n:"Okay",    d:"Browse uplifting content",      nc:"#1D4ED8"},
  {k:"sad",  cls:"mp-sad",  e:"🥺",n:"Sad",     d:"Talk to someone",               nc:"#6D28D9"},
  {k:"notok",cls:"mp-notok",e:"💔",n:"Not Okay",d:"Connect with a Listener now",  nc:"#9F1239"},
];
const FLOW_STEPS=[
  {side:"l",dot:"fd-s",tag:"ft-s",n:"Step 1",icon:"😊",title:"Share your mood",       desc:"Choose how you're feeling — Happy, Okay, Sad, or Not Okay. No sign-up, no name required.",alt:""},
  {side:"r",dot:"fd-v",tag:"ft-v",n:"Step 2",icon:"📋",title:"Fill a short form",     desc:"Tell us briefly what's on your mind and when you'd like to connect. Everything stays anonymous.",alt:"alt"},
  {side:"l",dot:"fd-r",tag:"ft-r",n:"Step 3",icon:"🗓️",title:"Book a time to talk",  desc:"Pick right now, in 30 minutes, later today, or schedule for another day — your choice.",alt:""},
  {side:"r",dot:"fd-g",tag:"ft-g",n:"Step 4",icon:"🎭",title:"Both stay anonymous",   desc:"You get a session code. Your Peer Listener has one too. No names, emails, or phone numbers — ever.",alt:"alt"},
  {side:"l",dot:"fd-a",tag:"ft-a",n:"Step 5",icon:"📹",title:"Talk via Meet or Chat", desc:"Join through Google Meet for a real conversation, or use our private anonymous text chat.",alt:""},
  {side:"r",dot:"fd-t",tag:"ft-t",n:"Step 6",icon:"💚",title:"Reflect & give feedback",desc:"After your session, tell us how it went. Your feedback helps us reach more people who need us.",alt:"alt"},
];
const MOBILE_STEPS=[
  {icon:"😊",title:"Feel",         desc:"Share your mood anonymously — no name needed."},
  {icon:"🗓️",title:"Talk",         desc:"Fill a quick form, book a time, connect by Meet or Chat."},
  {icon:"💚",title:"Heal",          desc:"Reflect, grow, and give feedback to help others."},
];
const QUOTES=[
  {q:"Vulnerability is not winning or losing; it's having the courage to show up when you can't control the outcome.",a:"Brené Brown",bg:"qb-saffron"},
  {q:"You don't have to be positive all the time. It's perfectly okay to feel sad, angry, frustrated, or scared.",a:"Lori Deschene",bg:"qb-violet"},
  {q:"There is no greater agony than bearing an untold story inside you.",a:"Maya Angelou",bg:"qb-rose"},
];
const TESTIMONIALS=[
  {q:"\"I didn't expect to feel so understood. The listener was patient, kind, and I never had to share my name.\"",ml:"tm-okay", mn:"Okay",    e:"🙂"},
  {q:"\"When I was at my lowest, someone was there within minutes. It genuinely changed things for me.\"",          ml:"tm-notok",mn:"Not Okay",e:"💔"},
  {q:"\"The Google Meet option felt so human. A real conversation. No pressure, just warmth.\"",                    ml:"tm-sad",  mn:"Sad",     e:"🥺"},
];
const LISTENER_PERKS=[
  "No experience needed — just willingness to listen",
  "Full training and ongoing support provided",
  "Flexible hours — show up when you can",
  "Join a warm, compassionate community",
  "Both you and those you support stay anonymous",
];

function genMeetCode(){const s=()=>Math.random().toString(36).substring(2,5);return`meet.google.com/izhaar-${s()}-${s()}`;}

export default function App(){
  const[page,     setPage]    =useState("home");
  const[splashOff,setSplashOff]=useState(false);
  const[hamOpen,  setHamOpen] =useState(false);
  const[feed,     setFeed]    =useState(FEED_INIT);
  const[feedInp,  setFeedInp] =useState("");
  const[modal,    setModal]   =useState(null);
  const[moodKey,  setMoodKey] =useState(null);
  const[connectM, setConnect] =useState(null);
  const[meetLink, setMeetLink]=useState("");
  const[copied,   setCopied]  =useState(false);
  const[formData, setFormData]=useState({name:"",topic:"",time:""});
  const[volForm,  setVolForm] =useState({role:"Peer Listener",avail:"1–2 days/week",langs:"",why:"",email:""});

  useEffect(()=>{const t=setTimeout(()=>setSplashOff(true),2800);return()=>clearTimeout(t);},[]);

  function navGo(p){setPage(p);setHamOpen(false);}
  function postFeed(){if(!feedInp.trim())return;setFeed(p=>[{id:Date.now(),e:"💌",t:feedInp,w:"You"},...p]);setFeedInp("");}
  function pickMood(k){setMoodKey(k);setModal(k==="happy"||k==="okay"?"happy_content":"form");}
  function submitSF(e){e.preventDefault();setModal("connect");}
  function chooseConnect(t){setConnect(t);if(t==="meet")setMeetLink(genMeetCode());setModal("booked");}
  function copyLink(){navigator.clipboard.writeText("https://"+meetLink).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000);}
  function submitVol(e){e.preventDefault();setModal("volsub");}
  function closeModal(){setModal(null);setMoodKey(null);setConnect(null);setFormData({name:"",topic:"",time:""});}

  const NAV=[
    {id:"home",    icon:"🏠",label:"Home"},
    {id:"feed",    icon:"🌸",label:"Kindness Feed"},
    {id:"join",    icon:"🤝",label:"Join / Volunteer"},
    {id:"feedback",icon:"⭐",label:"Feedback"},
  ];

  return(<>
    <style>{STYLES}</style>

    {/* SPLASH */}
    {!splashOff && (
      <div className="splash">
        <div className="splash-logo">🌸</div>
        <div className="splash-name">Izhaar</div>
        <div className="splash-tag">Where feelings find a home</div>
        <div className="splash-dots">
          <div className="splash-dot"/><div className="splash-dot"/><div className="splash-dot"/>
        </div>
      </div>
    )}

    {/* NAV */}
    <nav className="nav">
      {/* Logo */}
      <div className="logo" onClick={()=>navGo("home")}>
        <div className="logo-icon">🌸</div>
        <div className="logo-text">
          <span className="logo-name">Izhaar</span>
          <span className="logo-tag">Where feelings find a home</span>
        </div>
      </div>

      {/* Centre pills — pill-group style */}
      <div className="nav-center">
        {NAV.map(n=>(
          <button key={n.id} className={`nav-pill${page===n.id?" active":""}`} onClick={()=>navGo(n.id)}>
            <span>{n.icon}</span>{n.label}
          </button>
        ))}
      </div>

      {/* Right: Instagram + CTA + hamburger */}
      <div className="nav-right">
        <a href={INSTA_URL} target="_blank" rel="noopener noreferrer"
           className="nav-insta" title="Follow Izhaar on Instagram">
          <span className="nav-insta-dot"/>
          Instagram
        </a>
        <button className="nav-join"
          onClick={()=>window.open(JOIN_URL,"_blank","noopener,noreferrer")}>
          <span className="nav-join-icon">🌸</span>
          Become a Listener
        </button>
        <button className={`ham-btn${hamOpen?" open":""}`}
          onClick={()=>setHamOpen(p=>!p)} aria-label="Open menu">
          <span className="ham-line"/><span className="ham-line"/><span className="ham-line"/>
        </button>
      </div>
    </nav>

    {/* MOBILE DRAWER */}
    <div className={`mobile-drawer${hamOpen?" open":""}`}>
      {NAV.map(n=>(
        <button key={n.id} className={`drawer-pill${page===n.id?" active":""}`} onClick={()=>navGo(n.id)}>
          <span style={{fontSize:"1.2rem"}}>{n.icon}</span>{n.label}
        </button>
      ))}
      <div className="drawer-divider"/>
      <a href={INSTA_URL} target="_blank" rel="noopener noreferrer" className="drawer-insta">
        <span style={{width:10,height:10,borderRadius:"50%",background:"linear-gradient(135deg,#F472B6,#A78BFA)",display:"inline-block",flexShrink:0}}/>
        Instagram
      </a>
      <button className="drawer-join" onClick={()=>{setHamOpen(false);window.open(JOIN_URL,"_blank","noopener,noreferrer");}}>🌸 Become a Listener</button>
    </div>

    {/* ════ HOME ════ */}
    {page==="home" && (<>
      <section className="hero" id="top">
        <div className="orb orb-tl"/><div className="orb orb-tr"/><div className="orb orb-b"/>
        <div className="hero-badge"><span>🌸</span> A safe, anonymous space for everyone</div>
        <h1>You are anonymous.<br/><span className="t-saffron">You are heard.</span><br/><span className="t-grad">You are not alone.</span></h1>
        <div className="hero-sub">Heard. Safe. Always anonymous.</div>
        <p className="hero-desc">Izhaar is a confidential peer-support community where every feeling matters and every identity stays protected. No names. No judgement. Just genuine human warmth.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={()=>window.open(JOIN_URL,"_blank","noopener,noreferrer")}>🌸 Become a Listener</button>
          <button className="btn-outline" onClick={()=>setModal("mood")}>Express Yourself →</button>
        </div>
        <div style={{marginTop:52,display:"flex",flexDirection:"column",alignItems:"center",gap:6,opacity:.5,animation:"arrowBounce 2s ease-in-out infinite"}}>
          <span style={{fontSize:".78rem",letterSpacing:".08em",textTransform:"uppercase",color:"var(--gray)"}}>Scroll to explore</span>
          <span style={{fontSize:"1.3rem"}}>↓</span>
        </div>
      </section>

      {/* QUOTE 1 */}
      <div className="quote-band qb-saffron">
        <span className="quote-mark">"</span>
        <div className="quote-text">{QUOTES[0].q}</div>
        <div className="quote-attr">— {QUOTES[0].a}</div>
      </div>

      {/* ABOUT STRIP */}
      <section style={{background:"#fff",padding:"56px 40px"}}>
        <div style={{maxWidth:880,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
          <div>
            <span style={{display:"inline-block",background:"var(--saffron-bg)",color:"var(--saffron)",padding:"5px 16px",borderRadius:50,fontSize:".76rem",fontWeight:700,letterSpacing:".5px",textTransform:"uppercase",marginBottom:14}}>About Izhaar</span>
            <h2 style={{fontSize:"1.6rem",fontWeight:800,color:"var(--slate)",marginBottom:14,letterSpacing:"-.015em",lineHeight:1.25}}>A community built on presence, not advice</h2>
            <p style={{color:"var(--gray)",fontSize:".93rem",lineHeight:1.75,marginBottom:14}}>Izhaar — meaning <em>expression</em> in Urdu and Hindi — was born from a simple belief: that every person deserves to be heard without fear or judgement.</p>
            <p style={{color:"var(--gray)",fontSize:".93rem",lineHeight:1.75,marginBottom:24}}>We are an NGO-run peer support platform connecting people who are struggling with trained volunteer listeners. No therapy. No advice. Just a safe, anonymous space to feel less alone.</p>
            <button className="btn-primary" onClick={()=>window.open(JOIN_URL,"_blank","noopener,noreferrer")} style={{fontSize:".9rem",padding:"12px 24px"}}>Become a Listener →</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[
              {icon:"🎭",title:"Fully anonymous",   desc:"No names, no emails — ever."},
              {icon:"🌱",title:"Peer-led support",  desc:"Real people, not bots or scripts."},
              {icon:"🔒",title:"Private & secure",  desc:"End-to-end encrypted conversations."},
              {icon:"💚",title:"Free forever",      desc:"No cost. No catch. Just care."},
            ].map((v,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,background:i%2===0?"var(--saffron-bg)":"var(--violet-bg)",borderRadius:14,padding:"16px 18px",border:`1.5px solid ${i%2===0?"#FFD4C2":"#DDD6FE"}`}}>
                <span style={{fontSize:"1.4rem",flexShrink:0}}>{v.icon}</span>
                <div>
                  <div style={{fontWeight:700,fontSize:".9rem",color:"var(--slate)",marginBottom:2}}>{v.title}</div>
                  <div style={{fontSize:".8rem",color:"var(--gray)",lineHeight:1.5}}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOWCHART */}
      <section className="flow-section" id="how-it-works">
        <div className="flow-inner">
          <span className="sec-eyebrow">How Izhaar works</span>
          <h2 className="sec-title">Your journey from feeling to healing</h2>
          <p className="sec-desc">Six simple, anonymous steps. No barriers. No judgement. Just support when you need it most.</p>

          {/* Desktop 6-step alternating */}
          <div className="flow-steps">
            {FLOW_STEPS.map((s,i)=>(
              <div key={i} className="flow-row">
                <div className="flow-left">
                  {s.side==="l"&&<div className={`flow-card${s.alt?" "+s.alt:""}`}>
                    <span className={`flow-tag ${s.tag}`}>{s.n}</span>
                    <div style={{fontSize:"1.5rem",marginBottom:8}}>{s.icon}</div>
                    <h3>{s.title}</h3><p>{s.desc}</p>
                  </div>}
                </div>
                <div className="flow-center">
                  <div className={`flow-dot ${s.dot}`}>{s.icon}</div>
                  {i<FLOW_STEPS.length-1&&<div style={{position:"absolute",top:44,left:"50%",transform:"translateX(-50%)",width:2,height:"calc(100% - 44px)",background:"linear-gradient(180deg,#FFD4C2,#DDD6FE)"}}/>}
                </div>
                <div className="flow-right">
                  {s.side==="r"&&<div className={`flow-card${s.alt?" "+s.alt:""}`}>
                    <span className={`flow-tag ${s.tag}`}>{s.n}</span>
                    <div style={{fontSize:"1.5rem",marginBottom:8}}>{s.icon}</div>
                    <h3>{s.title}</h3><p>{s.desc}</p>
                  </div>}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile 3-step simplified */}
          <div className="flow-simple">
            {MOBILE_STEPS.map((s,i)=>(
              <div key={i} className="flow-simple-step">
                <div className="flow-simple-dot">{s.icon}</div>
                <div className="flow-simple-card">
                  <h3>{s.title}</h3><p>{s.desc}</p>
                </div>
                {i<MOBILE_STEPS.length-1&&<div className="flow-simple-line"/>}
              </div>
            ))}
          </div>

          <div style={{textAlign:"center",marginTop:48}}>
            <button className="btn-primary" onClick={()=>setModal("mood")}>Start Your Journey →</button>
          </div>
        </div>
      </section>

      <div className="section-divider"/>
      {/* QUOTE 2 */}
      <div className="quote-band qb-violet">
        <span className="quote-mark">"</span>
        <div className="quote-text">{QUOTES[1].q}</div>
        <div className="quote-attr">— {QUOTES[1].a}</div>
      </div>

      {/* PRIVACY */}
      <section className="hiw" id="privacy">
        <div className="hiw-inner">
          <span className="sec-eyebrow">Privacy & Safety</span>
          <h2 className="sec-title">Both parties are always anonymous</h2>
          <p className="sec-desc">We built trust into every layer of Izhaar.</p>
          <div className="hiw-grid">
            {[
              {icon:"🎭",h:"You are anonymous",       b:"No name, email or phone number ever collected. You receive a session code — nothing more."},
              {icon:"🛡",h:"Listeners are too",        b:"Peer Listeners also use anonymous IDs. No personal data is exchanged between either party."},
              {icon:"🔒",h:"Encrypted & unrecorded",  b:"All chats are end-to-end encrypted. Voice and video calls are never recorded or stored."},
            ].map((c,i)=>(
              <div key={i} className="hiw-card">
                <span className="hiw-icon">{c.icon}</span><h3>{c.h}</h3><p>{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>
      {/* QUOTE 3 */}
      <div className="quote-band qb-rose">
        <span className="quote-mark">"</span>
        <div className="quote-text">{QUOTES[2].q}</div>
        <div className="quote-attr">— {QUOTES[2].a}</div>
      </div>

      <div className="section-divider"/>
      {/* TESTIMONIALS */}
      <section className="testi-section" id="stories">
        <div className="testi-inner">
          <span className="sec-eyebrow">Community voices</span>
          <h2 className="sec-title">What people say</h2>
          <div className="testi-grid">
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} className="testi-card">
                <div className="testi-quote">{t.q}</div>
                <span className={`testi-mood ${t.ml}`}>{t.e} Feeling {t.mn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEEDBACK CTA */}
      <section className="feedback-section">
        <div className="feedback-inner">
          <div className="feedback-stars">⭐⭐⭐⭐⭐</div>
          <span className="feedback-icon">💬</span>
          <h2>Your voice matters to us</h2>
          <p>Had a session? Shared something on the kindness feed? Tell us how we're doing. Your anonymous feedback helps Izhaar grow and reach more people who need it.</p>
          <a className="feedback-btn" href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer">Share Your Feedback →</a>
        </div>
      </section>

      <div className="trust">
        <div className="trust-inner">
          <div className="trust-item"><span style={{color:"#FF6B35"}}>🛡</span> Role-based access control</div>
          <div className="trust-item"><span style={{color:"#EC4899"}}>🔒</span> End-to-end private chats</div>
          <div className="trust-item"><span style={{color:"#7C3AED"}}>🩷</span> Moderated &amp; safe</div>
        </div>
      </div>
    </>)}

    {/* ════ KINDNESS FEED ════ */}
    {page==="feed" && (
      <div className="page page-bg-pink">
        <div className="inner" style={{maxWidth:600}}>
          <h1 className="page-title">🌸 Kindness Feed</h1>
          <p className="page-sub">Send warmth. Receive hope. Every message is anonymous.</p>
          <div className="feed-compose">
            <div className="feed-lbl">💌 Share something kind, anonymously</div>
            <input className="feed-inp" value={feedInp} placeholder="Write something uplifting for someone who needs it…"
              onChange={e=>setFeedInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&postFeed()}/>
            <button className="feed-sub" onClick={postFeed}>Send with Love 🌸</button>
          </div>
          <div className="feed-list">
            {feed.map(f=>(
              <div key={f.id} className="feed-item">
                <div className="feed-av">{f.e}</div>
                <div><div className="feed-who">{f.w}</div><div className="feed-txt">{f.t}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* ════ JOIN / VOLUNTEER ════ */}
    {page==="join" && (
      <div className="join-page">
        <div className="join-inner">
          <div className="join-header">
            <span className="sec-eyebrow">Be part of Izhaar</span>
            <h1>Be a part of something meaningful</h1>
            <p>You don't need all the answers. You don't need to fix anyone. Just showing up with an open heart is enough — and we'll walk alongside you every step of the way.</p>
          </div>
          <div className="volunteer-card">
            <span className="vc-badge">Peer Listener · Volunteer</span>
            <span className="vc-icon">🌱</span>
            <div className="vc-title">Lend your presence, not just your words</div>
            <div className="vc-desc">Becoming a Peer Listener at Izhaar means offering your time and genuine attention to someone who needs to feel heard. We provide full training, a supportive community, and everything you need to show up with confidence and care.</div>
            <ul className="vc-perks">
              {LISTENER_PERKS.map((p,i)=>(
                <li key={i}><span className="vc-check">✓</span>{p}</li>
              ))}
            </ul>
            <button className="vc-btn" onClick={()=>window.open(JOIN_URL,"_blank","noopener,noreferrer")}>
              Apply to be a Listener →
            </button>
          </div>
          <div className="join-note">
            <div className="join-note-icon">🔒</div>
            <div className="join-note-text">
              <h4>Your privacy is always protected</h4>
              <p>All volunteer applications are processed securely. Your contact details are visible only to our admin team and never displayed publicly.</p>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* ════ FEEDBACK PAGE ════ */}
    {page==="feedback" && (
      <div className="page page-bg-violet" style={{textAlign:"center"}}>
        <div style={{maxWidth:560,margin:"0 auto"}}>
          <div style={{fontSize:"3.5rem",marginBottom:16}}>⭐</div>
          <h1 className="page-title" style={{textAlign:"center"}}>Share Your Feedback</h1>
          <p className="page-sub" style={{textAlign:"center",maxWidth:440,margin:"0 auto 32px"}}>Your experience shapes how Izhaar grows. Every response is anonymous and takes under 2 minutes.</p>
          <div style={{background:"#fff",borderRadius:20,padding:28,boxShadow:"var(--sh-md)",border:"1.5px solid #F0E8FF",marginBottom:20}}>
            {[
              {icon:"🔒",text:"Completely anonymous — no name required"},
              {icon:"⏱️",text:"Takes less than 2 minutes"},
              {icon:"💡",text:"Your input directly improves our support"},
              {icon:"🌍",text:"Helps Izhaar reach more people in need"},
            ].map((f,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,background:i%2?"var(--saffron-bg)":"var(--violet-bg)",borderRadius:12,padding:"11px 16px",marginBottom:i<3?10:0}}>
                <span style={{fontSize:"1.2rem"}}>{f.icon}</span>
                <span style={{fontSize:".88rem",color:"var(--slate)",fontWeight:500}}>{f.text}</span>
              </div>
            ))}
            <a className="feedback-btn" href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer"
              style={{display:"flex",width:"100%",justifyContent:"center",marginTop:20,background:"var(--grad)",color:"#fff"}}>
              Open Feedback Form →
            </a>
          </div>
          <p style={{fontSize:".78rem",color:"var(--gray-l)"}}>Opens in a new tab · Google Form · No account needed</p>
        </div>
      </div>
    )}

    {/* FOOTER */}
    <footer className="footer">
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:40,marginBottom:40,textAlign:"left"}}>
          <div>
            <div className="foot-logo" style={{justifyContent:"flex-start",marginBottom:12}}>
              <div className="foot-logo-icon">🌸</div>
              <div className="foot-logo-name">Izhaar</div>
            </div>
            <p style={{color:"rgba(255,255,255,.55)",fontSize:".85rem",lineHeight:1.7,maxWidth:280}}>A free, anonymous peer-support community run by volunteers. You are heard. You are not alone.</p>
            <div style={{display:"flex",gap:12,marginTop:16}}>
              <a href={INSTA_URL} target="_blank" rel="noopener noreferrer"
                title="Instagram"
                style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#F472B6,#A78BFA)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <div style={{color:"rgba(255,255,255,.9)",fontWeight:700,fontSize:".88rem",marginBottom:14,letterSpacing:".05em",textTransform:"uppercase"}}>Navigate</div>
            {[{l:"Home",p:"home"},{l:"Kindness Feed",p:"feed"},{l:"Join / Volunteer",p:"join"},{l:"Feedback",p:"feedback"}].map((x,i)=>(
              <div key={i} style={{marginBottom:8}}>
                <button onClick={()=>navGo(x.p)} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",fontSize:".84rem",cursor:"pointer",fontFamily:"var(--f)",padding:0,transition:"color .15s"}}
                  onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.5)"}>{x.l}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:"rgba(255,255,255,.9)",fontWeight:700,fontSize:".88rem",marginBottom:14,letterSpacing:".05em",textTransform:"uppercase"}}>Legal</div>
            {["Privacy Policy","Terms of Use","Safeguarding","Cookie Policy"].map((x,i)=>(
              <div key={i} style={{marginBottom:8}}>
                <a style={{color:"rgba(255,255,255,.5)",fontSize:".84rem",textDecoration:"none",transition:"color .15s",cursor:"pointer"}}
                  onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.5)"}>{x}</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{color:"rgba(255,255,255,.35)",fontSize:".78rem"}}>© {new Date().getFullYear()} Izhaar · All rights reserved · NGO</div>
          <div style={{color:"rgba(255,255,255,.35)",fontSize:".78rem",fontStyle:"italic"}}>"Where feelings find a home."</div>
        </div>
      </div>
    </footer>

    {/* ════ MODALS ════ */}
    {modal==="mood" && (
      <div className="ov" onClick={closeModal}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="mood-step-title">How are you feeling?</div>
          <div className="mood-step-sub">Pick a mood — no judgement, just support.</div>
          <div className="mood-pick-grid">
            {MOODS.map(m=>(
              <div key={m.k} className={`mood-pick-card ${m.cls}`} onClick={()=>pickMood(m.k)}>
                <span className="mp-emoji">{m.e}</span>
                <div className="mp-name" style={{color:m.nc}}>{m.n}</div>
                <div className="mp-desc">{m.d}</div>
              </div>
            ))}
          </div>
          <button className="m-close" onClick={closeModal}>Maybe later</button>
        </div>
      </div>
    )}

    {modal==="happy_content" && (
      <div className="ov" onClick={closeModal}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="mood-step-title">{moodKey==="happy"?"😄 So glad you're feeling happy!":"🙂 Good to hear you're okay!"}</div>
          <div className="mood-step-sub">{moodKey==="happy"?"Spread that joy — share it with the community!":"Browse some uplifting content to keep that energy going."}</div>
          <div className="happy-grid">
            {[
              {e:"🌸",t:"Kindness Feed",      d:"Read & share uplifting messages",    act:()=>{closeModal();navGo("feed");}},
              {e:"🌱",t:"Join as a Listener", d:"Be present for someone who needs it",act:()=>{closeModal();window.open(JOIN_URL,"_blank","noopener,noreferrer");}},
              {e:"🌟",t:"Share your story",   d:"Inspire others anonymously",         act:()=>{closeModal();navGo("feed");}},
              {e:"⭐",t:"Give Feedback",      d:"Tell us how we're doing",            act:()=>{closeModal();navGo("feedback");}},
            ].map((c,i)=>(
              <div key={i} className="happy-card" onClick={c.act}>
                <div style={{fontSize:"1.4rem",marginBottom:5}}>{c.e}</div>
                <h4>{c.t}</h4><p>{c.d}</p>
              </div>
            ))}
          </div>
          <button className="m-close" onClick={closeModal}>Maybe later</button>
        </div>
      </div>
    )}

    {modal==="form" && (
      <div className="ov" onClick={closeModal}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="mood-step-title">{moodKey==="notok"?"💔 We're here for you":"🥺 Let's find you support"}</div>
          <div className="mood-step-sub">A few quick details so we can match you with the right Peer Listener.<br/><span style={{fontSize:".75rem",color:"#94A3B8"}}>No personal data is stored.</span></div>
          <form onSubmit={submitSF}>
            <div className="mf-group">
              <label className="mf-label">What would you like to be called? (optional)</label>
              <input className="mf-inp" placeholder="e.g. Alex, or leave blank to stay anonymous" value={formData.name} onChange={e=>setFormData(p=>({...p,name:e.target.value}))}/>
            </div>
            <div className="mf-group">
              <label className="mf-label">What's on your mind? (brief)</label>
              <textarea className="mf-inp" rows={3} required style={{resize:"vertical"}} placeholder="e.g. Feeling overwhelmed, family stress, loneliness…" value={formData.topic} onChange={e=>setFormData(p=>({...p,topic:e.target.value}))}/>
            </div>
            <div className="mf-group">
              <label className="mf-label">When would you like to connect?</label>
              <select className="mf-inp" required value={formData.time} onChange={e=>setFormData(p=>({...p,time:e.target.value}))}>
                <option value="">Select a time…</option>
                <option>Right now</option><option>In 30 minutes</option>
                <option>Later today</option><option>Schedule for another day</option>
              </select>
            </div>
            <button type="submit" className="mf-submit">Book a Time to Talk →</button>
          </form>
          <button className="mf-back" onClick={()=>setModal("mood")}>← Back</button>
        </div>
      </div>
    )}

    {modal==="connect" && (
      <div className="ov" onClick={closeModal}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="mood-step-title">Choose how to connect</div>
          <div className="mood-step-sub">A Peer Listener is ready for you. How would you like to talk?</div>
          <div className="two-choice">
            <div className="choice-btn ch-meet" onClick={()=>chooseConnect("meet")}>
              <span className="ch-icon">📹</span>
              <div className="ch-label">Google Meet</div>
              <div className="ch-desc">Face-to-face video. More personal and human.</div>
            </div>
            <div className="choice-btn ch-chat" onClick={()=>chooseConnect("chat")}>
              <span className="ch-icon">💬</span>
              <div className="ch-label">Anonymous Chat</div>
              <div className="ch-desc">Text-based private chat. Fully anonymous.</div>
            </div>
          </div>
          <button className="mf-back" onClick={()=>setModal("form")}>← Go back</button>
        </div>
      </div>
    )}

    {modal==="booked" && (
      <div className="ov" onClick={closeModal}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <span className="success-icon">✅</span>
          <div className="m-title" style={{textAlign:"center",marginBottom:8}}>{connectM==="meet"?"Your Meet is ready!":"Chat session ready!"}</div>
          <p className="m-p" style={{textAlign:"center"}}>{connectM==="meet"?"A Peer Listener has been matched. Join your private anonymous Google Meet below.":"Your anonymous chat is live. Start whenever you're ready."}</p>
          <div className="priv-note">🔒 Fully anonymous. No personal data is recorded or stored.</div>
          {connectM==="meet"?(<>
            <div className="meet-result">
              <div className="meet-result-label">🔗 Your anonymous Meet link</div>
              <div className="meet-result-link">https://{meetLink}</div>
            </div>
            <button className="m-action" style={{background:"linear-gradient(135deg,#10B981,#059669)"}} onClick={()=>window.open("https://"+meetLink,"_blank","noopener,noreferrer")}>📹 Open Google Meet</button>
            <button className="m-action" style={{background:"#EFF6FF",color:"#2563EB",border:"1.5px solid #BFDBFE"}} onClick={copyLink}>{copied?"✅ Copied!":"📋 Copy Link"}</button>
          </>):(
            <button className="m-action" onClick={()=>{closeModal();navGo("feed");}}>💬 Go to Kindness Feed</button>
          )}
          <button className="m-close" style={{marginTop:4}} onClick={closeModal}>Close</button>
        </div>
      </div>
    )}

    {modal==="vol_form" && (
      <div className="ov" onClick={closeModal}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="m-title">🌱 Volunteer with Izhaar</div>
          <div className="vf-note">🛡️ Your contact details are seen only by our admin — never shared publicly.</div>
          <form onSubmit={submitVol}>
            {[
              {l:"Role",t:"select",opts:["Peer Listener","Moderator"],k:"role"},
              {l:"Availability",t:"select",opts:["1–2 days/week","3–4 days/week","5+ days/week"],k:"avail"},
              {l:"Languages",t:"input",ph:"e.g. English, Hindi, Spanish",k:"langs"},
              {l:"What draws you to this? (optional)",t:"area",ph:"Share a little about yourself…",k:"why"},
              {l:"Secure contact email (admin-only)",t:"input",ph:"never displayed publicly",k:"email"},
            ].map((f,i)=>(
              <div key={i} className="fg">
                <label className="fl">{f.l}</label>
                {f.t==="select"?<select className="fi" value={volForm[f.k]} onChange={e=>setVolForm(p=>({...p,[f.k]:e.target.value}))}>{f.opts.map(o=><option key={o}>{o}</option>)}</select>
                :f.t==="area"?<textarea className="fi" rows={3} placeholder={f.ph} style={{resize:"vertical"}} value={volForm[f.k]} onChange={e=>setVolForm(p=>({...p,[f.k]:e.target.value}))}/>
                :<input className="fi" placeholder={f.ph} type={f.k==="email"?"email":"text"} value={volForm[f.k]} onChange={e=>setVolForm(p=>({...p,[f.k]:e.target.value}))}/>}
              </div>
            ))}
            <button type="submit" className="fs">Submit Application 🌸</button>
          </form>
          <button className="m-close" style={{marginTop:10}} onClick={closeModal}>Cancel</button>
        </div>
      </div>
    )}

    {modal==="volsub" && (
      <div className="ov" onClick={closeModal}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <span className="success-icon">🌸</span>
          <div className="m-title" style={{textAlign:"center"}}>Application Received!</div>
          <p className="m-p" style={{textAlign:"center"}}>Thank you for wanting to be a part of Izhaar. Your application has been submitted securely. We'll reach out within 48 hours.</p>
          <div className="priv-note" style={{textAlign:"center"}}>Application submitted ✓</div>
          <button className="m-close" onClick={closeModal}>Wonderful, thank you! 💚</button>
        </div>
      </div>
    )}

    {modal==="report" && (
      <div className="ov" onClick={closeModal}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="m-title">🛡 Report / Block</div>
          <p className="m-p">Reports are anonymous and reviewed within 24 hours.</p>
          <select className="mf-inp" style={{marginBottom:10}}>
            <option>Select a reason…</option>
            <option>Spam or irrelevant</option>
            <option>Harassment or abuse</option>
            <option>Inappropriate content</option>
            <option>Other</option>
          </select>
          <textarea className="mf-inp" rows={3} placeholder="Additional details (optional)" style={{resize:"vertical",marginBottom:12,borderRadius:10}}/>
          <button className="m-action" onClick={closeModal}>Submit Report</button>
          <button className="m-close" onClick={closeModal}>Cancel</button>
        </div>
      </div>
    )}
  </>);
}

