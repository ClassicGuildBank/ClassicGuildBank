using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Tools
{
    public class BagImportModel
    {
        #region Properties

        private List<BagItemImportModel> _bagItemImportModels;
        public List<BagItemImportModel> BagItemImportModels
        {
            get
            {
                if (_bagItemImportModels == null)
                    _bagItemImportModels = new List<BagItemImportModel>();

                return _bagItemImportModels;
            }
        }

        private readonly string _bagName;
        public string BagName
        {
            get
            {
                return _bagName;
            }
        }
        private readonly string _container;
        public string Container
        {
            get
            {
                return _container;
            }
        }
        #endregion

        #region Constructor

        public BagImportModel(string container, string bagName)
        {
            _container = container;
            _bagName = bagName;
        }

        #endregion
    }
}
