#!/bin/bash

# 실행할 명령어를 정의합니다.
ip_addresses=$(ifconfig | grep -E '\d{3}\.' | awk '{print $2}')

# IP 주소 목록을 배열로 저장합니다.
ip_array=($ip_addresses)

# IP 주소 목록을 출력합니다.
echo "사용 가능한 IP 주소 목록:"
for ((i=0; i<${#ip_array[@]}; i++)); do
    echo "[$i] ${ip_array[i]}"
done

# 사용자에게 선택을 요청합니다.
read -p "원하는 IP 주소 번호를 입력하세요: " choice

# 선택한 번호에 해당하는 IP 주소를 가져옵니다.
selected_ip=${ip_array[$choice]}

# 선택한 IP 주소를 출력합니다.
echo "선택한 IP 주소: $selected_ip"

env_file=".env"

# .env 파일에 NEXT_PUBLIC_BACKEND_URL 변수 설정
echo "NEXT_PUBLIC_BACKEND_URL='http://$selected_ip:10000'" > "$env_file"
echo "NEXT_PUBLIC_BACKEND_URL을 .env 파일에 설정했습니다."