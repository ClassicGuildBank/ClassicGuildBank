using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace System
{
    public static class ObjectExtensions
    {
        #region Public Methods

        /// <summary>
        /// Returns all the properties of a given type on an instance.
        /// </summary>
        public static IEnumerable<TReturn> GetProperties<TInstance, TReturn>(this TInstance instance) where TReturn : class
        {
            foreach (var field in typeof(TInstance).GetFields())
                if (field.GetValue(instance) as TReturn != null)
                    yield return field.GetValue(instance) as TReturn;
        }

        #endregion
    }
}
