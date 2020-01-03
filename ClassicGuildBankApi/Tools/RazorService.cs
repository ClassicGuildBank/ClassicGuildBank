using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ClassicGuildBankApi.Tools
{
    public class RazorService
    {
        private readonly IRazorViewEngine _viewEngine;
        private readonly ITempDataProvider _tempDataProvider;
        private readonly IServiceProvider _serviceProvider;

        public RazorService(IRazorViewEngine viewEngine, ITempDataProvider tempDataProvider, IServiceProvider serviceProvider)
        {
            _viewEngine = viewEngine;
            _tempDataProvider = tempDataProvider;
            _serviceProvider = serviceProvider;
        }

        public async Task<string> RenderView<TModel>(string viewName, TModel model) where TModel : class
        {
            var actionContext = GetActionContext();
            var viewResult = _viewEngine.FindView(actionContext, viewName, false);

            if (!viewResult.Success)
                throw new InvalidOperationException($"Failed to locate view '{viewName}'");

            using (var sw = new StringWriter())
            {
                var viewData = new ViewDataDictionary<TModel>(new EmptyModelMetadataProvider(), new ModelStateDictionary()) { Model = model };
                var tempData = new TempDataDictionary(actionContext.HttpContext, _tempDataProvider);

                var viewContext = new ViewContext(actionContext, viewResult.View, viewData, tempData, sw, new HtmlHelperOptions());

                await viewResult.View.RenderAsync(viewContext);

                return sw.ToString();
            }
        }

        private ActionContext GetActionContext()
        {
            var httpContext = new DefaultHttpContext
            {
                RequestServices = _serviceProvider
            };

            return new ActionContext(httpContext, new RouteData(), new ActionDescriptor());
        }
    }
}
