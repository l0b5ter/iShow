



Module.register("iShow",{
	// Default module config.
	defaults: {
		ModuleName: "iShow",
		frameWidth: "600px",
		frameHeight: "600px",
		width:"100%",
		height:"100%",
        url: "http://magicmirror.builders/",
        scrolling: "no"
	},

	// Override dom generator.
	getDom: function() {
		var element = document.createElement("div")
        try {      
		element.className = this.config.ModuleName;
        element.style.width = this.config.frameWidth;
		element.style.height = this.config.frameHeight;

                var html = `
                        <div class="${this.config.ModuleName}" style="width: ${this.config.width}; height: ${this.config.height};">
                                <iframe
                                        src="${this.config.url}"
                                        width="${this.config.width}"
                                        height="${this.config.height}"
                                        scrolling="${this.config.scrolling}"
                                ></iframe>
                        </div>
                `;

        element.insertAdjacentHTML("afterbegin", html);
		} catch(err) { console.log(err); }
		return element
	},

	notificationReceived: function(notification, payload, sender) {
		switch(notification) {
			case "DOM_OBJECTS_CREATED":
			var timer = setInterval(()=>{
			this.sendSocketNotification("DO_YOUR_JOB", this.count)
			this.count++
			}, 1000)
		break
		}
	},

	socketNotificationReceived: function(notification, payload) {
		switch(notification) {
			case "I_DID":
			var elem = document.getElementById("COUNT")
			elem.innerHTML = "Count:" + payload
			break
		}
	}
});