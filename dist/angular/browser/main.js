import {
  HomeComponent,
  PokemonDetailsComponent,
  bootstrapApplication,
  provideHttpClient,
  provideRouter,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵtemplate
} from "./chunk-B3JVXT3F.js";

// src/app/app.component.ts
var AppComponent_Defer_1_DepsFn = () => [import("./chunk-X67MUEIP.js").then((m) => m.HomeComponent)];
function AppComponent_Defer_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-home");
  }
}
var AppComponent = class _AppComponent {
  constructor() {
    this.title = "angular";
  }
  static {
    this.\u0275fac = function AppComponent_Factory(t) {
      return new (t || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, AppComponent_Defer_0_Template, 1, 0);
        \u0275\u0275defer(1, 0, AppComponent_Defer_1_DepsFn);
        \u0275\u0275deferOnIdle();
      }
    } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 12 });
})();

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "pokemon-details/:id",
    component: PokemonDetailsComponent
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
};

// src/main.ts
bootstrapApplication(AppComponent, appConfig);
//# sourceMappingURL=main.js.map
