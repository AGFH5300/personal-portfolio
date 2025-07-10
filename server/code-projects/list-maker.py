
print("=== Advanced List Maker ===")
print("Convert text into lists with various processing options!")
print()

def get_text_input():
    """Get text from user with validation."""
    while True:
        text = input("Enter text to convert to list: ").strip()
        if text:
            return text
        print("Please enter some text.")

def get_split_method():
    """Get how user wants to split the text."""
    methods = {
        "1": ("spaces", " "),
        "2": ("commas", ","),
        "3": ("semicolons", ";"),
        "4": ("newlines", "\n"),
        "5": ("custom", None)
    }
    
    print("\nChoose how to split the text:")
    print("1. By spaces")
    print("2. By commas")
    print("3. By semicolons")
    print("4. By newlines")
    print("5. Custom delimiter")
    
    while True:
        choice = input("Enter your choice (1-5): ").strip()
        if choice in methods:
            if choice == "5":
                delimiter = input("Enter custom delimiter: ")
                return ("custom", delimiter)
            return methods[choice]
        print("Please enter a valid choice (1-5).")

def process_list(text_list, options):
    """Process the list based on user options."""
    processed_list = text_list.copy()
    
    if options.get("remove_empty", False):
        processed_list = [item for item in processed_list if item.strip()]
    
    if options.get("strip_whitespace", False):
        processed_list = [item.strip() for item in processed_list]
    
    if options.get("to_lowercase", False):
        processed_list = [item.lower() for item in processed_list]
    
    if options.get("to_uppercase", False):
        processed_list = [item.upper() for item in processed_list]
    
    if options.get("remove_duplicates", False):
        processed_list = list(dict.fromkeys(processed_list))  # Preserves order
    
    if options.get("sort_list", False):
        processed_list = sorted(processed_list)
    
    return processed_list

def get_processing_options():
    """Get processing options from user."""
    options = {}
    
    print("\nProcessing options (y/n for each):")
    
    options["strip_whitespace"] = input("Remove leading/trailing whitespace? (y/n): ").lower().strip() == 'y'
    options["remove_empty"] = input("Remove empty items? (y/n): ").lower().strip() == 'y'
    options["to_lowercase"] = input("Convert to lowercase? (y/n): ").lower().strip() == 'y'
    options["to_uppercase"] = input("Convert to uppercase? (y/n): ").lower().strip() == 'y'
    options["remove_duplicates"] = input("Remove duplicates? (y/n): ").lower().strip() == 'y'
    options["sort_list"] = input("Sort alphabetically? (y/n): ").lower().strip() == 'y'
    
    # Handle conflicting options
    if options["to_lowercase"] and options["to_uppercase"]:
        print("Note: Both lowercase and uppercase selected. Using lowercase.")
        options["to_uppercase"] = False
    
    return options

def display_results(original_text, delimiter_name, original_list, processed_list, options):
    """Display the results in a formatted way."""
    print(f"\n📝 Results:")
    print("=" * 50)
    
    print(f"Original text: {original_text}")
    print(f"Split by: {delimiter_name}")
    print(f"Original list length: {len(original_list)}")
    print(f"Final list length: {len(processed_list)}")
    
    print(f"\nOriginal list:")
    for i, item in enumerate(original_list, 1):
        print(f"  {i}. '{item}'")
    
    if processed_list != original_list:
        print(f"\nProcessed list:")
        for i, item in enumerate(processed_list, 1):
            print(f"  {i}. '{item}'")
        
        print(f"\nProcessing applied:")
        for option, enabled in options.items():
            if enabled:
                option_name = option.replace("_", " ").title()
                print(f"  ✅ {option_name}")
    
    print(f"\nFinal Python list:")
    print(f"  {processed_list}")
    
    print("=" * 50)

def main():
    """Main function to run the list maker."""
    while True:
        print("📋 Welcome to the Advanced List Maker! 📋")
        print()
        
        # Get text input
        text = get_text_input()
        
        # Get split method
        delimiter_name, delimiter = get_split_method()
        
        # Split the text
        original_list = text.split(delimiter)
        
        # Get processing options
        options = get_processing_options()
        
        # Process the list
        processed_list = process_list(original_list, options)
        
        # Display results
        display_results(text, delimiter_name, original_list, processed_list, options)
        
        # Ask if user wants to create another list
        print()
        create_another = input("Would you like to create another list? (y/n): ").lower().strip()
        if create_another not in ['y']:
            print("Thanks for using the Advanced List Maker! 📋")
            break
        print()

main()
