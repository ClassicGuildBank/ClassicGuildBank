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

        #endregion

        #region Constructor

        public BagImportModel( string bagName )
        {
            _bagName = bagName;
        }

        #endregion
    }
}
