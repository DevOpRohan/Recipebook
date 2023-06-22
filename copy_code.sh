#!/bin/bash

# Define the output file
output_file="prompt.txt"

# Clear the output file if it exists
> "$output_file"

# Define the folders to search
folders=("models" "routes" "controllers")

# Loop through each folder
for folder in "${folders[@]}"; do
  # Find all files in the folder and its subfolders
  find "$folder" -type f | while read -r file; do
    # Extract the filename and code from the file
    filename=$(basename "$file")
    code=$(cat "$file")

    # Create the output format
    if [[ $file == */*/* ]]; then
      # Case: //== folder1/subfolder/{filename}
      output="//== ${folder}/$(dirname "${file#$folder/}")/${filename}"
    else
      # Case: //folder1/{filename}
      output="//${folder}/${filename}"
    fi

    # Append the output format and code to the output file
    echo "$output" >> "$output_file"
    echo "\`\`\`" >> "$output_file"
    echo "$code" >> "$output_file"
    echo "\`\`\`" >> "$output_file"
    echo "" >> "$output_file"
  done
done