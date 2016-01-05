define([],function(){var a=Backbone.Collection.extend({model:Backbone.Model.extend({defaults:{visible:!0,target:"_parent"}}),fetch:function(a){a=a||{},this.reset(),this.add({id:"analysis",title:"Analyze Data",url:"",tooltip:"Analysis home view"}),this.add({id:"workflow",title:"Workflow",url:"workflow",tooltip:"Chain tools into workflows",disabled:!Galaxy.user.id}),this.add({id:"shared",title:"Shared Data",url:"library/index",tooltip:"Access published resources",menu:[{title:"Data Libraries deprecated",url:"library/index"},{title:"Data Libraries",url:"library/list",divider:!0},{title:"Published Histories",url:"history/list_published"},{title:"Published Workflows",url:"workflow/list_published"},{title:"Published Visualizations",url:"visualization/list_published"},{title:"Published Pages",url:"page/list_published"}]}),a.user_requests&&this.add({id:"lab",title:"Lab",menu:[{title:"Sequencing Requests",url:"requests/index"},{title:"Find Samples",url:"requests/find_samples_index"},{title:"Help",url:a.lims_doc_url}]}),this.add({id:"visualization",title:"Visualization",url:"visualization/list",tooltip:"Visualize datasets",disabled:!Galaxy.user.id,menu:[{title:"New Track Browser",url:"visualization/trackster",target:"_frame"},{title:"Saved Visualizations",url:"visualization/list",target:"_frame"}]}),Galaxy.user.get("is_admin")&&this.add({id:"admin",title:"Admin",url:"admin",tooltip:"Administer this Galaxy",cls:"admin-only"});var b={id:"help",title:"Help",tooltip:"Support, contact, and community hubs",menu:[{title:"Support",url:a.support_url,target:"_blank"},{title:"Search",url:a.search_url,target:"_blank"},{title:"Mailing Lists",url:a.mailing_lists,target:"_blank"},{title:"Videos",url:a.screencasts_url,target:"_blank"},{title:"Wiki",url:a.wiki_url,target:"_blank"},{title:"How to Cite Galaxy",url:a.citation_url,target:"_blank"}]};if(a.terms_url&&b.menu.push({title:"Terms and Conditions",url:a.terms_url,target:"_blank"}),a.biostar_url&&b.menu.unshift({title:"Ask a question",url:"biostar/biostar_question_redirect",target:"_blank"}),a.biostar_url&&b.menu.unshift({title:"Galaxy Biostar",url:a.biostar_url_redirect,target:"_blank"}),this.add(b),Galaxy.user.id){var c={id:"user",icon:"fa-user",cls:"loggedin-only",tooltip:"Account preferences and saved data",menu:[{title:"Logged in as "+Galaxy.user.get("email")},{title:"Preferences",url:"user?cntrller=user",target:"galaxy_main"},{title:"Custom Builds",url:"user/dbkeys",target:"galaxy_main"},{title:"Logout",url:"user/logout",target:"_top",divider:!0},{title:"Saved Histories",url:"history/list",target:"galaxy_main"},{title:"Saved Datasets",url:"dataset/list",target:"galaxy_main"},{title:"Saved Pages",url:"page/list",target:"_top"},{title:"API Keys",url:"user/api_keys?cntrller=user",target:"galaxy_main"}]};a.use_remote_user&&c.menu.push({title:"Public Name",url:"user/edit_username?cntrller=user",target:"galaxy_main"}),this.add(c)}else{var c={id:"user",icon:"fa-user",cls:"loggedout-only",tooltip:"Account registration or login",menu:[{title:"Login",url:"user/login",target:"galaxy_main"}]};a.allow_user_creation&&c.menu.push({title:"Register",url:"user/create",target:"galaxy_main"}),this.add(c)}var d=this.get(a.active_view);return d&&d.set("active",!0),(new jQuery.Deferred).resolve().promise()}}),b=Backbone.View.extend({initialize:function(a){var b=this;this.setElement(this._template()),this.$dropdown=this.$(".dropdown"),this.$toggle=this.$(".dropdown-toggle"),this.$menu=this.$(".dropdown-menu"),this.$note=this.$(".dropdown-note"),this.model=a.model,this.model.on("init change:title",function(){this.get("title")&&b.$toggle.html(this.get("title"))}).on("init change:visible",function(){b.$el.css({visibility:this.get("visible")&&"visible"||"hidden"})}).on("init change:note",function(){b.$note.html(this.get("note"))}).on("init change:note_cls",function(){this._prevNoteCls&&b.$note.removeClass(this._prevNoteCls),this.get("note_cls")&&b.$note.addClass(this._prevNoteCls=this.get("note_cls"))}).on("init change:show_note",function(){b.$note.css({display:this.get("show_note")&&"block"||"none"})}).on("init change:target",function(){b.$toggle.attr("target",this.get("target"))}).on("init change:url",function(){this.set("url",b._formatUrl(this.get("url"))),b.$toggle.attr("href",this.get("url"))}).on("init change:tooltip",function(){$(".tooltip").remove(),b.$toggle.tooltip("destroy").attr("title",this.get("tooltip")),this.get("tooltip")&&b.$toggle.tooltip({placement:"bottom"})}).on("init change:cls",function(){this._prevCls&&b.$toggle.removeClass(this._prevCls),this.get("cls")&&b.$toggle.addClass(this._prevCls=this.get("cls"))}).on("init change:icon",function(){this._prevIcon&&b.$toggle.removeClass(this._prevIcon),this.get("icon")&&b.$toggle.addClass(this._prevIcon="fa fa-2x "+this.get("icon"))}).on("init change:toggle",function(){b.$toggle[this.get("toggle")&&"addClass"||"removeClass"]("toggle")}).on("init change:disabled",function(){b.$toggle[this.get("disabled")&&"addClass"||"removeClass"]("disabled"),b._configurePopover()}).on("init change:active",function(){b.$dropdown[this.get("active")&&"addClass"||"removeClass"]("active")}).on("init change:show_menu",function(){this.get("menu")&&this.get("show_menu")?(b.$menu.show(),$("#dd-helper").show().off().on("click",function(){$("#dd-helper").hide(),b.model.set("show_menu",!1)})):(b.$menu.hide(),$("#dd-helper").hide())}).on("init change:menu",function(){b.$menu.empty().removeClass("dropdown-menu"),b.$toggle.find("b").remove(),this.get("menu")&&(_.each(this.get("menu"),function(a){b.$menu.append(b._buildMenuItem(a)),a.divider&&b.$menu.append($("<li/>").addClass("divider"))}),b.$menu.addClass("dropdown-menu"),b.$toggle.append($("<b/>").addClass("caret")))}).trigger("init")},events:{"click .dropdown-toggle":"_toggleClick"},_buildMenuItem:function(a){var b=this;return a=_.defaults(a||{},{title:"",url:"",target:"_parent"}),a.url=b._formatUrl(a.url),$("<li/>").append($("<a/>").attr("href",a.url).attr("target",a.target).html(a.title).on("click",function(c){c.preventDefault(),b.model.set("show_menu",!1),a.onclick&&a.onclick(),Galaxy.frame.add(a)}))},_toggleClick:function(a){var b=this.model;a.preventDefault(),$(".tooltip").hide(),b.trigger("dispatch",function(a){b.id!==a.id&&a.get("menu")&&a.set("show_menu",!1)}),b.get("disabled")||(b.get("menu")?b.set("show_menu",!0):b.get("onclick")?b.get("onclick")():Galaxy.frame.add(b.attributes))},_configurePopover:function(){function a(a,b){return $("<div/>").append($("<a/>").attr("href",Galaxy.root+b).html(a)).html()}var b=this;this.$toggle.popover&&this.$toggle.popover("destroy"),this.model.get("disabled")&&this.$toggle.popover({html:!0,placement:"bottom",content:"Please "+a("login","user/login?use_panels=True")+" or "+a("register","user/create?use_panels=True")+" to use this feature."}).on("shown.bs.popover",function(){setTimeout(function(){b.$toggle.popover("hide")},5e3)})},_formatUrl:function(a){return"string"==typeof a&&-1===a.indexOf("//")&&"/"!=a.charAt(0)?Galaxy.root+a:a},_template:function(){return'<ul class="nav navbar-nav"><li class="dropdown"><a class="dropdown-toggle"/><ul class="dropdown-menu"/><div class="dropdown-note"/></li></ul>'}});return{Collection:a,Tab:b}});
//# sourceMappingURL=../../maps/layout/menu.js.map