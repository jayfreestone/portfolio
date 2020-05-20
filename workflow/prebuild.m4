- name: Create dotenv file
  run: echo "ACF_PRO_KEY=${{ secrets.ACF_PRO_KEY }}" > .env
