(function() {
    console.log("🚀 Vahan Engine v6.0.2: Starting...");

    // Check if dashboard already exists to prevent duplicates
    if (document.getElementById('vahanBotContainer')) {
        document.getElementById('vahanBotContainer').remove();
    }

    const allStatesData = {
        "UP": {"name": "Uttar Pradesh", "mapping": {"80":"Agra","45":"Akbarpur","81":"Aligarh","36":"Amethi","79":"Auraiya","42":"Ayodhya","50":"Azamgarh","24":"Badaun","17":"Baghpat","40":"Bahraich","60":"Ballia","47":"Balrampur","90":"Banda","41":"Barabanki","25":"Bareilly","51":"Basti","66":"Bhadohi","20":"Bijnor","13":"Bulandshahr","67":"Chandauli","96":"Chitrakoot","52":"DEORIA","82":"Etah","75":"Etawah","76":"Farrukhabad","71":"FATHEHPUR","83":"FEROZABAD","14":"GHAZIABAD","61":"Ghazipur","43":"GONDA","53":"Gorakhpur","91":"HAMIRPUR(UP)","37":"Hapur","30":"HARDOI","86":"HATHRAS","62":"JAUNPUR","93":"JhansiRTO","23":"JPNAGAR","74":"Kannauj","77":"Kanpur Dehat","78":"KANPUR NAGAR","87":"Kasganj","73":"Kaushambi","31":"LAKHIMPUR Kheri","94":"Lalitpur","321":"MAHANAGAR ARTO LUCKNOW (UP321)","56":"Maharajganj","95":"Mahoba","84":"Mainpuri","85":"MATHURA","54":"Mau","15":"MEERUT RTO","63":"MIRZAPUR RTO","21":"MORADABAD","12":"MuzaffarNagar","16":"Noida","92":"Orai","57":"PADRAUNA(KUSHI NAGAR)","26":"Pilibhit","72":"PRATAPGARH","70":"Prayagraj RTO","33":"Raibareilly","22":"ARTO OFFICE RAMPUR","11":"SAHARANPUR RTO","27":"SAHJAHANPUR","38":"Sambhal ARTO","58":"Sant Kabir Nagar","19":"SHAMLI ARTO","55":"Siddharth Nagar(naugarh)","34":"Sitapur","64":"SONBHADRA","44":"Sultanpur","32":"TRANSPORT NAGAR RTO LUCKNOW (UP32)","35":"Unnao","65":"VARANASI RTO"}},
        "HR": {"name": "Haryana", "mapping": {"29":"BALLABGARH","81":"Bawal","51":"FARIDABAD","72":"GURUGRAM SOUTH","52":"HATHIN","50":"Hodel","82":"KANINA","43":"KOSLI","34":"MAHENDERGARH","35":"NARNAUL","27":"NUH","30":"PALWAL","76":"PATAUDI","36":"REWARI","96":"RLA TAURU","38":"RTA, FARIDABAD","55":"RTA, GURGAON","66":"RTA, MOHINDERGARH","47":"RTA, REWARI","87":"SDM BADKHAL","98":"SDM BADSHAHPUR","26":"SDM GURUGRAM","93":"SDM PUNHANA"}},
        "UK": {"name": "Uttarakhand", "mapping": {"1":"ALMORA RTO","2":"BAGESHWAR ARTO","7":"DEHRADUN RTO","4":"HALDWANI RTO","8":"HARIDWAR ARTO","11":"KARANPRAYAG ARTO","18":"KASHIPUR ARTO","15":"KOTDWAR ARTO","12":"PAURI RTO","5":"PITHORAGARH ARTO","19":"RAMNAGAR ARTO","20":"RANIKHET ARTO","14":"RISHIKESH ARTO","17":"ROORKEE ARTO","13":"RUDRAPRAYAG ARTO","3":"TANAKPUR ARTO","9":"TEHRI ARTO","6":"UDHAM SINGH NAGAR ARTO","10":"UTTARKASHI ARTO","16":"VIKAS NAGAR ARTO"}},
        "DL": {"name": "Delhi", "mapping": {"-1": "All Vahan4 Running Office"}}
    };

    const dashboardHTML = `<div id="vahanBotContainer" style="position:fixed;top:20px;right:20px;width:350px;background:#fff;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:10001;font-family:sans-serif;border:1px solid #ddd;"><div id="botHeader" style="background:#2c3e50;color:white;padding:15px;display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0;"><span style="font-weight:bold;font-size:12px;">🛰️ MIS SECURE GATEWAY v6.0</span><div><button id="minBot" style="background:none;border:none;color:white;cursor:pointer;font-size:18px;">−</button><button id="closeBot" style="background:none;border:none;color:white;cursor:pointer;margin-left:10px;">✖</button></div></div><div id="botBody" style="padding:20px;"><div id="setupArea"><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;"><label><input type="checkbox" class="st-chk" value="UP"> UP</label><label><input type="checkbox" class="st-chk" value="HR"> HR</label><label><input type="checkbox" class="st-chk" value="UK"> UK</label><label><input type="checkbox" class="st-chk" value="DL"> DL</label></div><button id="startBot" style="width:100%;padding:12px;background:#27ae60;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">CONNECT & SCAN</button></div><div id="progArea" style="display:none;"><div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span id="stTxt" style="font-size:11px;font-weight:bold;color:#2980b9;">Auth...</span><span id="pxt" style="font-size:11px;font-weight:bold;">0%</span></div><div style="width:100%;background:#eee;height:6px;border-radius:10px;margin-bottom:15px;overflow:hidden;"><div id="pBar" style="width:0%;height:100%;background:#27ae60;transition:0.3s;"></div></div><div style="background:#f8f9fa;padding:10px;border-radius:6px;border-left:4px solid #3498db;"><div id="cCt" style="font-size:13px;font-weight:bold;">Waiting...</div><div id="rCt" style="font-size:10px;color:#7f8c8d;margin-top:4px;">RTO: 0/0</div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:15px;text-align:center;"><div style="background:#f1f2f6;padding:5px;border-radius:4px;"><div style="font-size:9px;">MAKERS</div><div id="mLc" style="font-size:14px;font-weight:bold;color:#e67e22;">0</div></div><div style="background:#f1f2f6;padding:5px;border-radius:4px;"><div style="font-size:9px;">EST TIME</div><div id="tLt" style="font-size:14px;font-weight:bold;">--:--</div></div></div></div></div></div>`;
    document.body.insertAdjacentHTML('beforeend', dashboardHTML);

    const updateUI = (d) => {
        if(d.s) document.getElementById('stTxt').innerText = d.s;
        if(d.c) document.getElementById('cCt').innerText = d.c;
        if(d.r) document.getElementById('rCt').innerText = d.r;
        if(d.m) document.getElementById('mLc').innerText = d.m;
        if(d.p) {
            document.getElementById('pxt').innerText = d.p + "%";
            document.getElementById('pBar').style.width = d.p + "%";
        }
        if(d.t) document.getElementById('tLt').innerText = d.t;
    };

    document.getElementById('minBot').onclick = () => {
        let body = document.getElementById('botBody');
        let cont = document.getElementById('vahanBotContainer');
        body.style.display = body.style.display === 'none' ? 'block' : 'none';
        cont.style.width = body.style.display === 'none' ? '180px' : '350px';
    };

    document.getElementById('closeBot').onclick = () => document.getElementById('vahanBotContainer').remove();

    document.getElementById('startBot').onclick = async () => {
        const selected = Array.from(document.querySelectorAll('.st-chk:checked')).map(c => c.value);
        if (selected.length === 0) return alert("Bhai, state select karo!");
        document.getElementById('setupArea').style.display = 'none';
        document.getElementById('progArea').style.display = 'block';

        for (let stateCode of selected) {
            const stateInfo = allStatesData[stateCode];
            const rtoCodes = Object.keys(stateInfo.mapping);
            const masterMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            let csvRows = []; let currentHeaders = []; let parser = new DOMParser();

            for (let i = 0; i < rtoCodes.length; i++) {
                let code = rtoCodes[i]; let city = stateInfo.mapping[code];
                updateUI({
                    s: `Scanning ${stateInfo.n}`,
                    c: city,
                    r: `RTO: ${i + 1}/${rtoCodes.length}`,
                    p: Math.round((i / rtoCodes.length) * 100),
                    t: `${Math.floor(((rtoCodes.length - i) * 2.5) / 60)}m ${Math.floor(((rtoCodes.length - i) * 2.5) % 60)}s`
                });

                try {
                    const vsElem = document.querySelector('input[name*="javax.faces.ViewState"]');
                    const stateSel = document.querySelector('select[onchange*="selectedRto"]');
                    const sideBtn = document.querySelector('button[onclick*="combTablePnl"]:not([onclick*="VhCatg"])');

                    let s1 = new URLSearchParams();
                    s1.append("javax.faces.partial.ajax", "true");
                    s1.append("javax.faces.source", stateSel.id.replace("_input",""));
                    s1.append("javax.faces.partial.execute", stateSel.id.replace("_input",""));
                    s1.append("javax.faces.partial.render", "yaxisVar");
                    s1.append("javax.faces.behavior.event", "change");
                    s1.append("masterLayout_formlogin", "masterLayout_formlogin");
                    s1.append(stateSel.id, stateCode);
                    s1.append("selectedRto_input", code);
                    s1.append("javax.faces.ViewState", vsElem.value);
                    
                    let res1 = await fetch(window.location.href, { method: "POST", body: s1 });
                    let vs1 = parser.parseFromString(await res1.text(), "text/xml").querySelector("update[id*='ViewState']").textContent;
                    vsElem.value = vs1;
                    await new Promise(r => setTimeout(r, 1200));

                    let s2 = new URLSearchParams();
                    s2.append("javax.faces.partial.ajax", "true");
                    s2.append("javax.faces.source", sideBtn.id);
                    s2.append("javax.faces.partial.execute", "@all");
                    s2.append("javax.faces.partial.render", "combTablePnl");
                    s2.append(sideBtn.id, sideBtn.id);
                    s2.append("masterLayout_formlogin", "masterLayout_formlogin");
                    s2.append("j_idt30_input", "A");
                    s2.append(stateSel.id, stateCode);
                    s2.append("selectedRto_input", code);
                    s2.append("yaxisVar_input", "Maker");
                    s2.append("xaxisVar_input", "Month Wise");
                    s2.append("selectedYear_input", "2026");
                    s2.append("VhCatg", "LMV"); s2.append("VhCatg", "LPV");
                    s2.append("norms", "99"); s2.append("fuel", "4"); s2.append("fuel", "23");
                    s2.append("VhClass", "7");
                    s2.append("javax.faces.ViewState", vsElem.value);

                    let res2 = await fetch(window.location.href, { method: "POST", body: s2 });
                    let doc = parser.parseFromString(await res2.text(), "text/xml");
                    vsElem.value = doc.querySelector("update[id*='ViewState']").textContent;
                    let h = doc.querySelector("update[id='combTablePnl']").textContent;

                    if (h && !h.includes("No Record Found")) {
                        let d = document.createElement("div"); d.innerHTML = h;
                        let ths = Array.from(d.querySelectorAll("thead th")).map(t => t.innerText.trim().toUpperCase());
                        let am = [];
                        ths.forEach((t, x) => { if (masterMonths.includes(t)) am.push({ n: t, x: x }); });
                        if (currentHeaders.length === 0) currentHeaders = am.map(m => m.n);

                        let mkCount = 0;
                        d.querySelectorAll("tbody tr").forEach(row => {
                            let cs = row.querySelectorAll('td');
                            let mkr = cs[1]?.innerText.trim();
                            if (mkr && !mkr.includes("TOTAL") && !mkr.includes("Maker")) {
                                mkCount++;
                                let fr = [stateInfo.name, city, stateCode + code, `"${mkr}"`];
                                am.forEach(m => { fr.push(cs[m.x]?.innerText.trim() || "0"); });
                                csvRows.push(fr.join(","));
                            }
                        });
                        updateUI({ m: mkCount });
                    }
                } catch (e) { console.error(e); }
                await new Promise(r => setTimeout(r, 1000));
            }
            if (csvRows.length > 0) {
                let d = new Date();
                let b = new Blob([(["State,City,RTO,Maker", ...currentHeaders].join(",")) + "\n" + csvRows.join("\n")], { type: 'text/csv' });
                let l = document.createElement("a");
                l.href = URL.createObjectURL(b);
                l.download = `Vahan_${stateCode}_Report_${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}.csv`;
                l.click();
            }
        }
        updateUI({ s: "COMPLETED ✅", p: 100, c: "All Data Saved!" });
    };
    console.log("✅ Vahan Engine Rendered Successfully!");
})();
