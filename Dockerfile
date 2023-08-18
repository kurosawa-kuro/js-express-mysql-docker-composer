# Node.jsの公式イメージをベースにします
FROM node:14

# アプリケーションディレクトリを作成
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースをバンドル
COPY . .

# ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD [ "node", "index.js" ]
