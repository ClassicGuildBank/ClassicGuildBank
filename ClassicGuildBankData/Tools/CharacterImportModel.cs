using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Tools
{
    public class CharacterImportModel
    {
        #region Data Members

        private static readonly string[] Localizations = {
            "enUS",
            "esMX",
            "ptBR",
            "deDE",
            "esES",
            "frFR",
            "itIT",
            "ptPT",
            "ruRU",
            "koKR",
            "zhTW",
            "zhCN"
        };

        #endregion

        #region Properties

        private readonly string _characterName;
        public string CharacterName
        {
            get
            {
                return _characterName;
            }
        }

        private readonly string _localization;
        public string Localization
        {
            get
            {
                return _localization;
            }
        }

        private readonly int _money;
        public int Money
        {
            get
            {
                return _money;
            }
        }

        private List<BagImportModel> _bagImportModels;
        public List<BagImportModel> BagImportModels
        {
            get
            {
                if (_bagImportModels == null)
                    _bagImportModels = new List<BagImportModel>();

                return _bagImportModels;
            }
        }

        private List<ItemDepositImportModel> _depositImportModels;
        public List<ItemDepositImportModel> DepositImportModels
        {
            get
            {
                if (_depositImportModels == null)
                    _depositImportModels = new List<ItemDepositImportModel>();

                return _depositImportModels;
            }
        }

        #endregion

        #region Constructor

        public CharacterImportModel(string encodedImportString)
        {
            var encodedBytes = Convert.FromBase64String(encodedImportString);
            var importString = Encoding.UTF8.GetString(encodedBytes);

            var depositIndex = importString.IndexOf("[DEPOSITS]");
            
            if( depositIndex != -1)
            {
                var depositString = importString.Substring(depositIndex).Replace("[DEPOSITS]", String.Empty);
                importString = importString.Substring(0, depositIndex);
                
                AddDeposits(depositString);
            }

            var importItems = importString.Split(';').Where(item => item != string.Empty).ToArray();

            var characterInfo = importItems[0].Trim('[', ']').Split(',');

            _characterName = characterInfo[0];

            _money = GetMoney(characterInfo.ElementAtOrDefault(1));

            _localization = GetLocalization(characterInfo.ElementAtOrDefault(2));

            var bags = importItems[1].Trim('[', ']').Split(',');

            AddBags(bags);

            var items = importItems.Skip(2).Select(item => item.Trim('[', ']').Split(','));

            AddItems(items);
        }

        #endregion

        #region Private Methods

        private void AddBags(string[] bags)
        {
            for (int i = 0; i < bags.Count(); i++)
            {
                BagImportModels.Add(new BagImportModel(bags[++i]));
            }
        }

        private void AddItems(IEnumerable<string[]> items)
        {
            foreach (var item in items)
            {
                var bagItemImportModel = new BagItemImportModel
                (
                    Int32.Parse(item[1]),
                    Int32.Parse(item[2]),
                    Int32.Parse(item[3])
                );

                var containerSlot = Int32.Parse(item[0]);

                BagImportModels[containerSlot + 1].BagItemImportModels.Add(bagItemImportModel);
            }
        }

        private void AddDeposits(string depositString)
        {
            var deposits = depositString.Split(';').Where(item => item != string.Empty).ToArray().Select(d => d.Trim('[', ']').Split(','));
            foreach( var deposit in deposits )
            {
                Thread.Sleep(5); // So we get unique timestamps
                var dModel = new ItemDepositImportModel
                (
                    deposit[0],
                    Int32.Parse(deposit[1]),
                    Int32.Parse(deposit[2]),
                    Int32.Parse(deposit[3])
                );
                DepositImportModels.Add(dModel);
            }
        }

        private string GetLocalization(string localizationString)
        {
            if (Localizations.Contains(localizationString))
                return localizationString;

            return "en_US";
        }

        private int GetMoney(string moneyString)
        {
            int money;

            if (!int.TryParse(moneyString, out money))
                return 0;

            return money;
        }

        #endregion
    }
}
