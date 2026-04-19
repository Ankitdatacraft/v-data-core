(async function() {
    if (!window.location.href.includes("vahan4dashboard")) {
        console.error("Bhai, pehle Vahan Dashboard wala page kholiye!"); return;
    }

    const allStatesData = {
        "UP": {"name": "Uttar Pradesh", "mapping": {"80":"Agra","45":"Akbarpur","81":"Aligarh","36":"Amethi","79":"Auraiya","42":"Ayodhya","50":"Azamgarh","24":"Badaun","17":"Baghpat","40":"Bahraich","60":"Ballia","47":"Balrampur","90":"Banda","41":"Barabanki","25":"Bareilly","51":"Basti","66":"Bhadohi","20":"Bijnor","13":"Bulandshahr","67":"Chandauli","96":"Chitrakoot","52":"DEORIA","82":"Etah","75":"Etawah","76":"Farrukhabad","71":"FATHEHPUR","83":"FEROZABAD","14":"GHAZIABAD","61":"Ghazipur","43":"GONDA","53":"Gorakhpur","91":"HAMIRPUR(UP)","37":"Hapur","30":"HARDOI","86":"HATHRAS","62":"JAUNPUR","93":"JhansiRTO","23":"JPNAGAR","74":"Kannauj","77":"Kanpur Dehat","78":"KANPUR NAGAR","87":"Kasganj","73":"Kaushambi","31":"LAKHIMPUR Kheri","94":"Lalitpur","321":"MAHANAGAR ARTO LUCKNOW (UP321)","56":"Maharajganj","95":"Mahoba","84":"Mainpuri","85":"MATHURA","54":"Mau","15":"MEERUT RTO","63":"MIRZAPUR RTO","21":"MORADABAD","12":"MuzaffarNagar","16":"Noida","92":"Orai","57":"PADRAUNA(KUSHI NAGAR)","26":"Pilibhit","72":"PRATAPGARH","70":"Prayagraj RTO","33":"Raibareilly","22":"ARTO OFFICE RAMPUR","11":"SAHARANPUR RTO","27":"SAHJAHANPUR","38":"Sambhal ARTO","58":"Sant Kabir Nagar","19":"SHAMLI ARTO","55":"Siddharth Nagar(naugarh)","34":"Sitapur","64":"SONBHADRA","44":"Sultanpur","32":"TRANSPORT NAGAR RTO LUCKNOW (UP32)","35":"Unnao","65":"VARANASI RTO"}},
        "HR": {"name": "Haryana", "mapping": {"29":"BALLABGARH","81":"Bawal","51":"FARIDABAD","72":"GURUGRAM SOUTH","52":"HATHIN","50":"Hodel","82":"KANINA","43":"KOSLI","34":"MAHENDERGARH","35":"NARNAUL","27":"NUH","30":"PALWAL","76":"PATAUDI","36":"REWARI","96":"RLA TAURU","38":"RTA, FARIDABAD","55":"RTA, GURGAON","66":"RTA, MOHINDERGARH","47":"RTA, REWARI","87":"SDM BADKHAL","98":"SDM BADSHAHPUR","26":"SDM GURUGRAM","93":"SDM PUNHANA"}},
        "UK": {"name": "Uttarakhand", "mapping": {"1":"ALMORA RTO","2":"BAGESHWAR ARTO","7":"DEHRADUN RTO","4":"HALDWANI RTO","8":"HARIDWAR ARTO","11":"KARANPRAYAG ARTO","18":"KASHIPUR ARTO","15":"KOTDWAR ARTO","12":"PAURI RTO","5":"PITHORAGARH ARTO","19":"RAMNAGAR ARTO","20":"RANIKHET ARTO","14":"RISHIKESH ARTO","17":"ROORKEE ARTO","13":"RUDRAPRAYAG ARTO","3":"TANAKPUR ARTO","9":"TEHRI ARTO","6":"UDHAM SINGH NAGAR ARTO","10":"UTTARKASHI ARTO","16":"VIKAS NAGAR ARTO"}},
        "DL": {"name": "Delhi", "mapping": {"-1": "All Vahan4 Running Office"}}
    };

    // --- 🖥️ DASHBOARD UI GENERATOR ---
    const dashboardHTML = `
    <div id="vahanBotContainer" style="position:fixed; top:20px; right:20px; width:350px; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.3); z-index:10001; font-family:'Segoe UI', Tahoma, Geneva, sans-serif; overflow:hidden; border:1px solid #ddd; transition: all 0.3s ease;">
        <div id="botHeader" style="background:#2c3e50; color:white; padding:15px; cursor:move; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:bold; font-size:14px;">🚀 VAHAN MASTER v6.0</span>
            <div>
                <button id="minBot" style="background:none; border:none; color:white; cursor:pointer; font-size:18px; padding:0 5px;">−</button>
                <button id="closeBot" style="background:none; border:none; color:white; cursor:pointer; font-size:14px; padding:0 5px;">✖</button>
            </div>
        </div>
        
        <div id="botBody" style="padding:20px;">
            <div id="setupArea">
                <p style="margin:0 0 10px 0; font-size:13px; color:#666;">Select States to Process:</p>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:20px;">
                    <label style="font-size:13px;"><input type="checkbox" class="state-chk" value="UP"> UP</label>
                    <label style="font-size:13px;"><input type="checkbox" class="state-chk" value="HR"> HR</label>
                    <label style="font-size:13px;"><input type="checkbox" class="state-chk" value="UK"> UK</label>
                    <label style="font-size:13px;"><input type="checkbox" class="state-chk" value="DL"> Delhi</label>
                </div>
                <button id="startBot" style="width:100%; padding:12px; background:#27ae60; color:white; border:none; border-radius:6px; font-weight:bold; cursor:pointer; transition:0.2s;">START ENGINE</button>
            </div>

            <div id="progressArea" style="display:none;">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span id="statusText" style="font-size:12px; font-weight:bold; color:#2980b9;">Initializing...</span>
                    <span id="percentText" style="font-size:12px; font-weight:bold; color:#2c3e50;">0%</span>
                </div>
                <div style="width:100%; background:#ecf0f1; height:8px; border-radius:10px; margin-bottom:15px; overflow:hidden;">
                    <div id="progressBar" style="width:0%; height:100%; background:#27ae60; transition:width 0.3s;"></div>
                </div>
                
                <div style="background:#f8f9fa; padding:10px; border-radius:8px; border-left:4px solid #3498db;">
                    <div style="font-size:11px; color:#7f8c8d; margin-bottom:4px;">CURRENT RTO</div>
                    <div id="currentCity" style="font-size:14px; font-weight:bold; color:#2c3e50;">Waiting...</div>
                    <div id="rtoCount" style="font-size:11px; color:#34495e; margin-top:4px;">RTO: 0 / 0</div>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:15px;">
                    <div style="text-align:center; padding:8px; background:#f1f2f6; border-radius:6px;">
                        <div style="font-size:10px; color:#7f8c8d;">MAKERS</div>
                        <div id="makerLiveCount" style="font-size:15px; font-weight:bold; color:#e67e22;">0</div>
                    </div>
                    <div style="text-align:center; padding:8px; background:#f1f2f6; border-radius:6px;">
                        <div style="font-size:10px; color:#7f8c8d;">EST. TIME</div>
                        <div id="timeLeft" style="font-size:15px; font-weight:bold; color:#2c3e50;">--:--</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', dashboardHTML);

    const container = document.getElementById('vahanBotContainer');
    const minBtn = document.getElementById('minBot');
    const startBtn = document.getElementById('startBot');
    const closeBtn = document.getElementById('closeBot');
    const setupArea = document.getElementById('setupArea');
    const progressArea = document.getElementById('progressArea');
    
    // UI Update functions
    const updateUI = (data) => {
        if(data.status) document.getElementById('statusText').innerText = data.status;
        if(data.city) document.getElementById('currentCity').innerText = data.city;
        if(data.rtoTracker) document.getElementById('rtoCount').innerText = data.rtoTracker;
        if(data.makers) document.getElementById('makerLiveCount').innerText = data.makers;
        if(data.percent) {
            document.getElementById('percentText').innerText = data.percent + "%";
            document.getElementById('progressBar').style.width = data.percent + "%";
        }
        if(data.time) document.getElementById('timeLeft').innerText = data.time;
    };

    // Minimize logic
    let isMinimized = false;
    minBtn.onclick = () => {
        isMinimized = !isMinimized;
        document.getElementById('botBody').style.display = isMinimized ? 'none' : 'block';
        container.style.width = isMinimized ? '200px' : '350px';
    };

    closeBtn.onclick = () => container.remove();

    startBtn.onclick = async () => {
        const selected = Array.from(document.querySelectorAll('.state-chk:checked')).map(c => c.value);
        if (selected.length === 0) return alert("Select at least one state!");
        
        setupArea.style.display = 'none';
        progressArea.style.display = 'block';
        await mainExecution(selected);
    };

    async function mainExecution(selectedStates) {
        for (let stateCode of selectedStates) {
            await processState(stateCode);
        }
        updateUI({status: "COMPLETED ✅", percent: 100, city: "All Files Downloaded"});
        console.log("%c 🏆 MISSION ACCOMPLISHED!", "color:white;background:#27ae60;padding:10px;font-weight:bold;");
    }

    async function processState(stateCode) {
        const stateInfo = allStatesData[stateCode];
        const rtoMapping = stateInfo.mapping;
        const rtoCodes = Object.keys(rtoMapping);
        const masterMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        
        let csvRows = []; let currentHeaders = []; let parser = new DOMParser();

        for (let i = 0; i < rtoCodes.length; i++) {
            let code = rtoCodes[i]; let city = rtoMapping[code];
            
            // Calculate Progress & Est Time
            let percent = Math.round(((i) / rtoCodes.length) * 100);
            let remainingSeconds = (rtoCodes.length - i) * 2.5; // Avg 2.5 sec per RTO
            let min = Math.floor(remainingSeconds / 60);
            let sec = Math.floor(remainingSeconds % 60);

            updateUI({
                status: `Scanning ${stateInfo.name}...`,
                city: city,
                rtoTracker: `RTO: ${i + 1} / ${rtoCodes.length}`,
                percent: percent,
                time: `${min}m ${sec}s`
            });

            const sideBtn = document.querySelector('button[onclick*="combTablePnl"]:not([onclick*="VhCatg"])');
            const stateSel = document.querySelector('select[onchange*="selectedRto"]');
            const vsElem = document.querySelector('input[name*="javax.faces.ViewState"]');

            if (!sideBtn || !stateSel || !vsElem) break;

            try {
                // STEP 1: RTO Sync
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
                if(vs1) vsElem.value = vs1;
                await new Promise(r => setTimeout(r, 1200));

                // STEP 2: Fetch Data
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
                let xmlDoc = parser.parseFromString(await res2.text(), "text/xml");
                let vs2 = xmlDoc.querySelector("update[id*='ViewState']").textContent;
                if(vs2) vsElem.value = vs2;

                let tableHtml = xmlDoc.querySelector("update[id='combTablePnl']").textContent;
                if(tableHtml && !tableHtml.includes("No Record Found")) {
                    let div = document.createElement("div"); div.innerHTML = tableHtml;
                    let tableHeaders = Array.from(div.querySelectorAll("thead th")).map(th => th.innerText.trim().toUpperCase());
                    let activeMonths = [];
                    tableHeaders.forEach((h, idx) => { if (masterMonths.includes(h)) activeMonths.push({name: h, idx: idx}); });
                    if (currentHeaders.length === 0) currentHeaders = activeMonths.map(m => m.name);

                    let makersInCity = 0;
                    div.querySelectorAll("tbody tr").forEach(row => {
                        let cells = row.querySelectorAll('td');
                        let maker = cells[1]?.innerText.trim();
                        if(maker && !maker.includes("TOTAL") && !maker.includes("Maker")) {
                            makersInCity++;
                            let finalRow = [stateInfo.name, city, `${stateCode}${code}`, `"${maker}"`];
                            for(let mIdx = 0; mIdx < currentHeaders.length; mIdx++) {
                                finalRow.push(cells[mIdx + 2]?.innerText.trim() || "0");
                            }
                            csvRows.push(finalRow.join(","));
                        }
                    });
                    updateUI({makers: makersInCity});
                    console.log(`🛰️ [${stateCode}] ${city} | Makers: ${makersInCity}`);
                }
            } catch (err) { console.error(err); }
            await new Promise(r => setTimeout(r, 1000));
        }

        if(csvRows.length > 0) {
            let today = new Date();
            let dStr = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
            let finalCSV = ["State,City,RTO_Code,Maker Name", ...currentHeaders].join(",") + "\n" + csvRows.join("\n");
            let blob = new Blob([finalCSV], {type:'text/csv'});
            let link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `Vahan_${stateCode}_Report_${dStr}.csv`;
            link.click();
        }
    }
})();
