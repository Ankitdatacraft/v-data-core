(function() {
    console.log("🚀 Vahan Engine v6.0.5: Using cs[mIdx + 2] Method");

    if (document.getElementById('vahanBotContainer')) {
        document.getElementById('vahanBotContainer').remove();
    }

    const states = {
        "UP": {"n": "Uttar Pradesh", "m": {"80":"Agra","45":"Akbarpur","81":"Aligarh","36":"Amethi","79":"Auraiya","42":"Ayodhya","50":"Azamgarh","24":"Badaun","17":"Baghpat","40":"Bahraich","60":"Ballia","47":"Balrampur","90":"Banda","41":"Barabanki","25":"Bareilly","51":"Basti","66":"Bhadohi","20":"Bijnor","13":"Bulandshahr","67":"Chandauli","96":"Chitrakoot","52":"DEORIA","82":"Etah","75":"Etawah","76":"Farrukhabad","71":"FATHEHPUR","83":"FEROZABAD","14":"GHAZIABAD","61":"Ghazipur","43":"GONDA","53":"Gorakhpur","91":"HAMIRPUR(UP)","37":"Hapur","30":"HARDOI","86":"HATHRAS","62":"JAUNPUR","93":"JhansiRTO","23":"JPNAGAR","74":"Kannauj","77":"Kanpur Dehat","78":"KANPUR NAGAR","87":"Kasganj","73":"Kaushambi","31":"LAKHIMPUR Kheri","94":"Lalitpur","321":"MAHANAGAR ARTO LUCKNOW (UP321)","56":"Maharajganj","95":"Mahoba","84":"Mainpuri","85":"MATHURA","54":"Mau","15":"MEERUT RTO","63":"MIRZAPUR RTO","21":"MORADABAD","12":"MuzaffarNagar","16":"Noida","92":"Orai","57":"PADRAUNA(KUSHI NAGAR)","26":"Pilibhit","72":"PRATAPGARH","70":"Prayagraj RTO","33":"Raibareilly","22":"ARTO OFFICE RAMPUR","11":"SAHARANPUR RTO","27":"SAHJAHANPUR","38":"Sambhal ARTO","58":"Sant Kabir Nagar","19":"SHAMLI ARTO","55":"Siddharth Nagar(naugarh)","34":"Sitapur","64":"SONBHADRA","44":"Sultanpur","32":"TRANSPORT NAGAR RTO LUCKNOW (UP32)","35":"Unnao","65":"VARANASI RTO"}},
        "HR": {"n": "Haryana", "m": {"29":"BALLABGARH","81":"Bawal","51":"FARIDABAD","72":"GURUGRAM SOUTH","52":"HATHIN","50":"Hodel","82":"KANINA","43":"KOSLI","34":"MAHENDERGARH","35":"NARNAUL","27":"NUH","30":"PALWAL","76":"PATAUDI","36":"REWARI","96":"RLA TAURU","38":"RTA, FARIDABAD","55":"RTA, GURGAON","66":"RTA, MOHINDERGARH","47":"RTA, REWARI","87":"SDM BADKHAL","98":"SDM BADSHAHPUR","26":"SDM GURUGRAM","93":"SDM PUNHANA"}},
        "UK": {"n": "Uttarakhand", "m": {"1":"ALMORA RTO","2":"BAGESHWAR ARTO","7":"DEHRADUN RTO","4":"HALDWANI RTO","8":"HARIDWAR ARTO","11":"KARANPRAYAG ARTO","18":"KASHIPUR ARTO","15":"KOTDWAR ARTO","12":"PAURI RTO","5":"PITHORAGARH ARTO","19":"RAMNAGAR ARTO","20":"RANIKHET ARTO","14":"RISHIKESH ARTO","17":"ROORKEE ARTO","13":"RUDRAPRAYAG ARTO","3":"TANAKPUR ARTO","9":"TEHRI ARTO","6":"UDHAM SINGH NAGAR ARTO","10":"UTTARKASHI ARTO","16":"VIKAS NAGAR ARTO"}},
        "DL": {"n": "Delhi", "m": {"-1": "All Vahan4 Running Office"}}
    };

    const ui = `<div id="vahanBotContainer" style="position:fixed;top:20px;right:20px;width:350px;background:#fff;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:10001;font-family:sans-serif;border:1px solid #ddd;"><div style="background:#2c3e50;color:white;padding:15px;display:flex;justify-content:space-between;border-radius:12px 12px 0 0;"><span style="font-size:12px;font-weight:bold;">🛰️ MIS SECURE GATEWAY v6.0.5</span><div><button id="minB" style="background:none;border:none;color:white;cursor:pointer;">−</button><button id="clsB" style="background:none;border:none;color:white;cursor:pointer;margin-left:10px;">✖</button></div></div><div id="botB" style="padding:20px;"><div id="setA"><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;"><label><input type="checkbox" class="s-chk" value="UP"> UP</label><label><input type="checkbox" class="s-chk" value="HR"> HR</label><label><input type="checkbox" class="s-chk" value="UK"> UK</label><label><input type="checkbox" class="s-chk" value="DL"> DL</label></div><button id="stB" style="width:100%;padding:12px;background:#27ae60;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">START SCAN</button></div><div id="prA" style="display:none;"><div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span id="stT" style="font-size:11px;font-weight:bold;color:#2980b9;">Initializing...</span><span id="pxT" style="font-size:11px;font-weight:bold;">0%</span></div><div style="width:100%;background:#eee;height:6px;border-radius:10px;margin-bottom:15px;overflow:hidden;"><div id="pB" style="width:0%;height:100%;background:#27ae60;transition:0.3s;"></div></div><div style="background:#f8f9fa;padding:10px;border-radius:6px;border-left:4px solid #3498db;"><div id="cCt" style="font-size:13px;font-weight:bold;">Waiting...</div><div id="rCt" style="font-size:10px;color:#7f8c8d;margin-top:4px;">RTO: 0/0</div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:15px;text-align:center;"><div style="background:#f1f2f6;padding:5px;border-radius:4px;"><div style="font-size:9px;">MAKERS</div><div id="mLc" style="font-size:14px;font-weight:bold;color:#e67e22;">0</div></div><div style="background:#f1f2f6;padding:5px;border-radius:4px;"><div style="font-size:9px;">EST TIME</div><div id="tLt" style="font-size:14px;font-weight:bold;">--:--</div></div></div></div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', ui);

    window.vahanUpdate = (d) => {
        if(d.s) document.getElementById('stT').innerText = d.s;
        if(d.c) document.getElementById('cCt').innerText = d.c;
        if(d.r) document.getElementById('rCt').innerText = d.r;
        if(d.m) document.getElementById('mLc').innerText = d.m;
        if(d.p) { document.getElementById('pxT').innerText = d.p + "%"; document.getElementById('pB').style.width = d.p + "%"; }
        if(d.t) document.getElementById('tLt').innerText = d.t;
    };

    document.getElementById('minB').onclick = () => {
        let b = document.getElementById('botB');
        b.style.display = b.style.display === 'none' ? 'block' : 'none';
    };
    document.getElementById('clsB').onclick = () => document.getElementById('vahanBotContainer').remove();

    document.getElementById('stB').onclick = async () => {
        const sel = Array.from(document.querySelectorAll('.s-chk:checked')).map(c => c.value);
        if (!sel.length) return;
        document.getElementById('setA').style.display = 'none';
        document.getElementById('prA').style.display = 'block';

        const masterMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        for (let sc of sel) {
            const si = states[sc];
            const codes = Object.keys(si.m);
            let rows = []; let heads = []; let parser = new DOMParser();

            for (let i = 0; i < codes.length; i++) {
                let code = codes[i]; let city = si.m[code];
                window.vahanUpdate({
                    s: `Scanning ${si.n}`, c: city, r: `RTO: ${i+1}/${codes.length}`,
                    p: Math.round((i/codes.length)*100),
                    t: `${Math.floor(((codes.length-i)*2.5)/60)}m ${Math.floor(((codes.length-i)*2.5)%60)}s`
                });

                try {
                    const vs = document.querySelector('input[name*="javax.faces.ViewState"]');
                    const selRto = document.querySelector('select[onchange*="selectedRto"]');
                    const btn = document.querySelector('button[onclick*="combTablePnl"]:not([onclick*="VhCatg"])');

                    let p1 = new URLSearchParams();
                    p1.append("javax.faces.partial.ajax", "true");
                    p1.append("javax.faces.source", selRto.id.replace("_input",""));
                    p1.append("javax.faces.partial.execute", selRto.id.replace("_input",""));
                    p1.append("javax.faces.partial.render", "yaxisVar");
                    p1.append("javax.faces.behavior.event", "change");
                    p1.append("masterLayout_formlogin", "masterLayout_formlogin");
                    p1.append(selRto.id, sc);
                    p1.append("selectedRto_input", code);
                    p1.append("javax.faces.ViewState", vs.value);
                    
                    let r1 = await fetch(window.location.href, { method: "POST", body: p1 });
                    vs.value = parser.parseFromString(await r1.text(), "text/xml").querySelector("update[id*='ViewState']").textContent;
                    await new Promise(r => setTimeout(r, 1200));

                    let p2 = new URLSearchParams();
                    p2.append("javax.faces.partial.ajax", "true");
                    p2.append("javax.faces.source", btn.id);
                    p2.append("javax.faces.partial.execute", "@all");
                    p2.append("javax.faces.partial.render", "combTablePnl");
                    p2.append(btn.id, btn.id);
                    p2.append("masterLayout_formlogin", "masterLayout_formlogin");
                    p2.append("j_idt30_input", "A");
                    p2.append(selRto.id, sc);
                    p2.append("selectedRto_input", code);
                    p2.append("yaxisVar_input", "Maker");
                    p2.append("xaxisVar_input", "Month Wise");
                    p2.append("selectedYear_input", "2026");
                    p2.append("VhCatg", "LMV"); p2.append("VhCatg", "LPV");
                    p2.append("norms", "99"); p2.append("fuel", "4"); p2.append("fuel", "23");
                    p2.append("VhClass", "7");
                    p2.append("javax.faces.ViewState", vs.value);

                    let r2 = await fetch(window.location.href, { method: "POST", body: p2 });
                    let doc = parser.parseFromString(await r2.text(), "text/xml");
                    vs.value = doc.querySelector("update[id*='ViewState']").textContent;
                    let html = doc.querySelector("update[id='combTablePnl']").textContent;

                    if (html && !html.includes("No Record Found")) {
                        let d = document.createElement("div"); d.innerHTML = html;
                        let ths = Array.from(d.querySelectorAll("thead th")).map(t => t.innerText.trim().toUpperCase());
                        
                        let currentAvailMonths = [];
                        ths.forEach(t => { if (masterMonths.includes(t)) currentAvailMonths.push(t); });
                        if (!heads.length) heads = currentAvailMonths;

                        let mkc = 0;
                        d.querySelectorAll("tbody tr").forEach(row => {
                            let cs = row.querySelectorAll('td');
                            let mkr = cs[1]?.innerText.trim();
                            if (mkr && !mkr.includes("TOTAL") && !mkr.includes("Maker")) {
                                mkc++;
                                let fr = [si.n, city, sc + code, `"${mkr}"`];
                                // Back to your original indexing method
                                for (let mIdx = 0; mIdx < heads.length; mIdx++) {
                                    fr.push(cs[mIdx + 2]?.innerText.trim() || "0");
                                }
                                rows.push(fr.join(","));
                            }
                        });
                        window.vahanUpdate({ m: mkc });
                    }
                } catch (e) { console.error(e); }
                await new Promise(r => setTimeout(r, 1000));
            }
            if (rows.length) {
                let d = new Date();
                let b = new Blob([(["State,City,RTO,Maker", ...heads].join(",")) + "\n" + rows.join("\n")], { type: 'text/csv' });
                let l = document.createElement("a");
                l.href = URL.createObjectURL(b);
                l.download = `Vahan_${sc}_Report_${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}.csv`;
                l.click();
            }
        }
        window.vahanUpdate({ s: "COMPLETED ✅", p: 100, c: "Done!" });
    };
})();
