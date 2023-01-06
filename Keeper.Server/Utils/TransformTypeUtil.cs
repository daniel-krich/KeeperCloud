using System.Linq.Expressions;

namespace Keeper.Server.Utils
{
    
    public static class TransformTypeUtil
    {
        public enum CaseType
        {
            SnakeCase,
            CamelCase,
            PascalCase
        }

        public static To Transform<From, To>(From source) where To : new()
        {
            var destination = new To();
            var sourceProperties = typeof(From).GetProperties();
            var destinationProperties = typeof(To).GetProperties();
            foreach (var sourceProperty in sourceProperties)
            {
                var destinationProperty = destinationProperties.FirstOrDefault(x => x.Name == sourceProperty.Name);
                if (destinationProperty != null && destinationProperty.PropertyType == sourceProperty.PropertyType)
                {
                    destinationProperty.SetValue(destination, sourceProperty.GetValue(source));
                }
            }
            return destination;
        }

        public static IDictionary<string, object?>? MapObjectToDictionary(object source, CaseType propCaseType)
        {
            if (source == null)
                return null;

            var sourceType = source.GetType();
            var properties = sourceType.GetProperties();
            var fields = sourceType.GetFields();

            var result = new Dictionary<string, object?>();

            foreach (var property in properties)
            {
                var propertyValue = property.GetValue(source);
                var propertyName = ConvertCase(property.Name, propCaseType);
                result[propertyName] = propertyValue;
            }

            foreach (var field in fields)
            {
                var fieldValue = field.GetValue(source);
                var fieldName = ConvertCase(field.Name, propCaseType);
                result[fieldName] = fieldValue;
            }

            return result;
        }

        private static string ConvertCase(string input, CaseType caseType)
        {
            switch (caseType)
            {
                case CaseType.SnakeCase:
                    return string.Concat(input.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToLower();
                case CaseType.CamelCase:
                    return input.First().ToString().ToLower() + input.Substring(1);
                case CaseType.PascalCase:
                    return input;
                default:
                    return input;
            }
        }
    }
}