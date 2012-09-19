(function(jQuery) {
    jQuery.fn.kalkis = function(params) {
        var valutaer = {
            DZD: "Algerisk dinar (DZD)",
            USD: "Amerikansk dollar (USD)",
            ANG: "Antilliansk gylden (ANG)",
            ARS: "Argentinsk peso (ARS)",
            AUD: "Australsk dollar (AUD)",
            BHD: "Bahrainsk dinar (BHD)",
            BOB: "Boliviansk boliviano (BOB)",
            BWP: "Botswansk pula (BWP)",
            BRL: "Brasiliansk real (BRL)",
            GBP: "Britisk pund (GBP)",
            BND: "Bruneisk dollar (BND)",
            BGN: "Bulgarsk lev (BGN)",
            CAD: "Canadisk dollar (CAD)",
            KYD: "Caymansk dollar (KYD)",
            CLP: "Chilensk peso (CLP)",
            COP: "Colombiansk peso (COP)",
            CRC: "Costaricansk colon (CRC)",
            DKK: "Dansk krone (DKK)",
            DOP: "Dominikansk peso (DOP)",
            EGP: "Egyptisk pund (EGP)",
            AED: "Emiratarabisk dirham (AED)",
            EEK: "Estlandsk krone (EEK)",
            EUR: "Euro (EUR)",
            FJD: "Fijiansk dollar (FJD)",
            PHP: "Filippinsk peso (PHP)",
            HNL: "Honduransk lempira (HNL)",
            HKD: "Hong Kong dollar (HKD)",
            INR: "Indisk rupi (INR)",
            IDR: "Indonesisk rupiah (IDR)",
            ILS: "Israelsk shekel (ILS)",
            JMD: "Jamaicansk dollar (JMD)",
            JPY: "Japansk yen (JPY)",
            YER: "Jemenittisk rial (YER)",
            JOD: "Jordansk dinar (JOD)",
            KZT: "Kasakhstansk tenge (KZT)",
            KES: "Kenyansk shilling (KES)",
            CNY: "Kinesisk renminbi (Yuan)",
            HRK: "Kroatisk kuna (HRK)",
            KWD: "Kuwaitisk dinar (KWD)",
            LVL: "Latvisk lats (LVL)",
            LBP: "Libanesisk pund (LBP)",
            LTL: "Litauisk litas (LTL)",
            MKD: "Makedonsk denar (MKD)",
            MYR: "Malaysisk ringgit (MYR)",
            MAD: "Marokkansk dirham (MAD)",
            MUR: "Mauritisk rupi (MUR)",
            MXN: "Meksikansk peso (MXN)",
            MDL: "Moldovsk leu (MDL)",
            NAD: "Namibisk dollar (NAD)",
            NPR: "Nepalsk rupi (NPR)",
            NZD: "Newzealandsk dollar (NZD)",
            NIO: "Nicaraguansk cordoba (NIO)",
            NGN: "Nigeriansk naira (NGN)",
            NOK: "Norsk krone (NOK)",
            OMR: "Omansk rial (OMR)",
            PKR: "Pakistansk rupi (PKR)",
            PGK: "Papuansk kina (PGK)",
            PYG: "Paraguayansk guarani (PYG)",
            PEN: "Peruansk nuevo sol (PEN)",
            PLN: "Polsk zloty (PLN)",
            QAR: "Qatarsk riyal (QAR)",
            RON: "Rumensk leu (RON)",
            RUB: "Russisk rubel (RUB)",
            SVC: "Salvadoransk colón (SVC)",
            SAR: "Saudiarabisk riyal (SAR)",
            CSD: "Serbisk dinar (CSD)",
            SCR: "Seychelliansk rupi (SCR)",
            SLL: "Sierraleonsk leone (SLL)",
            SGD: "Singaporsk dollar (SGD)",
            SKK: "Slovakisk koruna (SKK)",
            LKR: "Srilankisk rupi (LKR)",
            CHF: "Sveitsisk franc (CHF)",
            SEK: "Svensk krone (SEK)",
            ZAR: "Sørafrikansk rand (ZAR)",
            KRW: "Sørkoreansk won (KRW)",
            TWD: "Taiwansk dollar (TWD)",
            TZS: "Tanzaniansk shilling (TZS)",
            THB: "Thailandsk baht (THB)",
            TTD: "Trinidadisk dollar (TTD)",
            CZK: "Tsjekkisk koruna (CZK)",
            TND: "Tunisisk dinar (TND)",
            TRY: "Tyrkisk lira (TRY)",
            UGX: "Ugandisk shilling (UGX)",
            UAH: "Ukrainsk hryvnia (UAH)",
            HUF: "Ungarsk forint (HUF)",
            UYU: "Uruguayansk peso (UYU)",
            VEB: "Venezuelansk bolivar (VEB)",
            VND: "Vietnamesisk dong (VND)",
            ZMK: "Zambisk kwacha (ZMK)"
        },m = {
            overskrift: '',
            desimaler: 2,
            fra_sum: 100,
            fra_val: 'NOK',
            til_val: 'USD'
        };
        jQuery.extend(m, params);
        
        var self    = this,
            form    = jQuery('<form />', {id: 'valutaForm'}),
            br      = jQuery('<br>'),
            header  = jQuery('<p />', {text: m.overskrift, id: 'valutaHeader'}),
            input_f = jQuery('<input />', {maxlength: '12', size: '5', autocomplete: 'off', value: m.fra_sum, 'class': 'currSel', id: 'valuta_fra'}),
            fra     = jQuery('<select />', {id: 'fra', 'class': 'currSel'}),
            input_t = jQuery('<input />', {maxlength: '12', size: '5', autocomplete: 'off', value: '100', 'class': 'currSel', id: 'valuta_til'}),
            til     = jQuery('<select />', {id: 'til', 'class': 'currSel'}),
            loader  = jQuery('<div />', {id: 'loader_kalkis', html: '<img src="http://bildr.no/image/1266185.jpeg" />'});
            options = '';
            
        jQuery.each(valutaer, function(k,v) {
            options += '<option value="'+k+'">'+v+'</option>';
        });
        
        var options_fra = jQuery(options),
            options_til = jQuery(options).clone(true),
            calc        = Math.pow(10, m.desimaler) || 1;
        options_fra.filter('[value="'+m.fra_val.toUpperCase()+'"]').prop('selected', true);
        options_til.filter('[value="'+m.til_val.toUpperCase()+'"]').prop('selected', true);
        fra.append(options_fra);
        til.append(options_til);
        form.append(header).append(input_f).append(fra).append(br).append(input_t).append(til).append(loader).appendTo(this.empty());
        
        var timer;
        input_f.add(til).on('keyup change', function() {
            clearTimeout(timer);
            loader.show();
            hent('select * from json where url="http://www.google.com/ig/calculator?hl=en&q='+input_f.val()+fra.val()+'=?'+til.val()+'"', function(data) {
                var x = Math.round( parseFloat(data.query.results.json.rhs.replace(/[A-Za-z\s$-]/g, "")) *calc)/calc;
                    x = data.query.results.json.rhs.indexOf('million')!=-1?Math.round(x*1000000):x;
                    x = data.query.results.json.rhs.indexOf('billion')!=-1?Math.round(x*1000000000):x;
                    x = data.query.results.json.rhs.indexOf('trillion')!=-1?Math.round(x*1000000000000):x;
                input_t.val(x);
                loader.hide();
            });
        }).trigger('change');
        
        input_t.add(fra).on('keyup change', function() {
            clearTimeout(timer);
            loader.show();
            hent('select * from json where url="http://www.google.com/ig/calculator?hl=en&q='+input_t.val()+til.val()+'=?'+fra.val()+'"', function(data) {
                var x = Math.round( parseFloat(data.query.results.json.rhs.replace(/[A-Za-z\s$-]/g, "")) *calc)/calc;
                    x = data.query.results.json.rhs.indexOf('million')!=-1?Math.round(x*1000000):x;
                    x = data.query.results.json.rhs.indexOf('billion')!=-1?Math.round(x*1000000000):x;
                    x = data.query.results.json.rhs.indexOf('trillion')!=-1?Math.round(x*1000000000000):x;
                input_f.val(x);
                loader.hide();
            });
        });
        function hent(query, callback) {
            timer = setTimeout(function() {
                if (!query || !callback) {throw new Error('Feil : Udefinerte parametere!');}
                var encodedQuery = encodeURIComponent(query.toLowerCase()),url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodedQuery + '&format=json&callback=?';
                jQuery.getJSON(url, callback);
            }, 500);
        };
    }
})(jQuery);