% MATLAB 코드: ESP32로부터 CIR 데이터 수신 및 시각화 + 칼만 필터 적용
serialPort = 'COM7';  % ESP32가 연결된 포트 (Windows 기준, Linux는 /dev/ttyUSB0 등)
baudRate = 115200;     % ESP32의 Serial 통신 속도

fileIndex = 1; %파일 인덱스 초기화

while true

    % Serial 객 체 생성 및 열기
    s = serialport(serialPort, baudRate);
    configureTerminator(s, "LF");  % 줄바꿈 문자 기준으로 데이터 수신
    
    % 데이터 저장용 배열 초기화
    realData = [];
    imagData = [];
    
    disp('데이터 수신 중...');
    
    while true
        line = readline(s);
        
        % "CIR end" 메시지를 받으면 수신 중단
        if contains(line, "CIR end")
            break;
        end
        
        % 데이터가 실수부, 허수부 형식인지 확인
        if contains(line, ",")
            data = split(line, ",");
            realPart = str2double(data(1));
            imagPart = str2double(data(2));
            %disp(realPart);
            disp(imagPart);
            if ~isnan(realPart) %초기 쓰레기값 분류
                % 데이터 저장
                realData = [realData; realPart];
                imagData = [imagData; imagPart];
            end
        end
    end
    
    % Serial 포트 닫기
    clear s;
    
    disp('데이터 수신 완료.');
    
    dataFilename = sprintf('Data%d.txt', fileIndex);
    writematrix([realData,imagData], dataFilename);
    disp([dataFilename, '로 데이터 저장 완료. 칼만 필터 적용 및 시각화 중...']);
    % ------------------------------------------------------
    % 이동 평균 필터
    % windowSize = 5; % 윈도우 크기 (평균을 낼 샘플 수)
    % b = (1/windowSize) * ones(1, windowSize);
    % a = 1;
    % 
    % % 이동 평균 필터 적용
    % filteredData = filter(b, a, realData);
    % 
    % % 결과 시각화
    % figure;
    % plot(realData, '-b', 'DisplayName', '원본 데이터', 'LineWidth', 1);
    % hold on;
    % plot(filteredData, '-r', 'DisplayName', '이동 평균 필터 적용 데이터', 'LineWidth', 2);
    % legend;
    % title('이동 평균 필터 적용 결과');
    % xlabel('샘플 인덱스');
    % ylabel('값');
    % grid on;
    
    % ------------------------------------------------------
    % % 칼만 필터 파라미터 설정
    % Q = 1e-5;  % 프로세스 잡음 공분산
    % R = 1e-2;  % 측정 잡음 공분산
    % P = 1;     % 초기 오차 공분산
    % 
    % % 필터링된 데이터 저장용 배열 초기화
    % filteredRealData = zeros(size(realData));
    % filteredImagData = zeros(size(imagData));
    % 
    % % 초기 상태 설정
    % realEstimate = realData(1);
    % imagEstimate = imagData(1);
    % 
    % % 실수부 및 허수부에 각각 칼만 필터 적용
    % for i = 1:length(realData)
    %     % 예측 단계
    %     realPrediction = realEstimate;
    %     imagPrediction = imagEstimate;
    %     P = P + Q;
    % 
    %     % 측정 업데이트 단계
    %     K = P / (P + R); % Kalman 이득 계산
    % 
    %     % 현재 측정값이 유효한지 확인
    %     if ~isnan(realData(i))
    %         realEstimate = realPrediction + K * (realData(i) - realPrediction);
    %     else
    %         realEstimate = realPrediction;  % NaN인 경우 이전 예측값 유지
    %     end
    % 
    %     if ~isnan(imagData(i))
    %         imagEstimate = imagPrediction + K * (imagData(i) - imagPrediction);
    %     else
    %         imagEstimate = imagPrediction;  % NaN인 경우 이전 예측값 유지
    %     end
    % 
    %     P = (1 - K) * P;
    % 
    %     % 필터링된 데이터 저장
    %     filteredRealData(i) = realEstimate;
    %     filteredImagData(i) = imagEstimate;
    % end
    % 
    % disp(filteredRealData);
    % disp(filteredImagData);
    
    %%%figure 1
    
    % 시각화 - 2x2 배열로 배치
    figure;

    % 좌상단: 원본 실수부 데이터
    subplot(2,2,1);
    plot(realData, 'b'); % 원본 데이터 - 파란색
    title('CIR - Real Part (Original)');
    xlabel('Sample');
    ylabel('Amplitude');

    % 우상단: 원본 허수부 데이터
    subplot(2,2,2);
    plot(imagData, 'b'); % 원본 데이터 - 파란색
    title('CIR - Imaginary Part (Original)');
    xlabel('Sample');
    ylabel('Amplitude');
    
    % 좌하단: 필터링된 실수부 데이터
    subplot(2,2,3);
    plot(filteredRealData, 'b'); % 필터링된 데이터 - 빨간색
    title('CIR - Real Part (Kalman Filtered)');
    xlabel('Sample');
    ylabel('Amplitude');

    % 우하단: 필터링된 허수부 데이터
    subplot(2,2,4);
    plot(filteredImagData, 'b'); % 필터링된 데이터 - 빨간색
    title('CIR - Imaginary Part (Kalman Filtered)');
    xlabel('Sample');
    ylabel('Amplitude');
    % ------------------------------------------------------
    % % 진폭 및 위상 계산
    % amplitude = sqrt(realData.^2 + imagData.^2);
    % phase = atan2(imagData, realData);
    % 
    % % 시각화
    % figure;
    % subplot(2,1,1);
    % plot(amplitude);
    % title('CIR Amplitude');
    % xlabel('Sample');
    % ylabel('Amplitude');
    % 
    % subplot(2,1,2);
    % plot(phase);
    % title('CIR Phase');
    % xlabel('Sample');
    % ylabel('Phase (radians)');
    

    
    %%%figure 2 진폭 + 위상%%%

    % 실수부와 허수부 데이터를 복소수로 결합
    complexCIR = sqrt(realData.^2 + imagData.^2);
    % 이동 평균 필터
    windowSize = 10; % 윈도우 크기 (평균을 낼 샘플 수)
    b = (1/windowSize) * ones(1, windowSize);
    a = 1;

    % 이동 평균 필터 적용
    filteredData = filter(b, a, complexCIR);
    z = realData + 1i* imagData;

    % 방법 1: 진폭(Amplitude) 플롯
    figure;
    subplot(2,1,1);
    plot(complexCIR, '-b', 'DisplayName', '원본 데이터', 'LineWidth', 1);
    hold on;
    plot(filteredData, '-r', 'DisplayName', '이동 평균 필터 적용 데이터', 'LineWidth', 2);
    title('CIR Amplitude');
    xlabel('Sample');
    ylabel('Amplitude');

    % 방법 2: 폴라 플롯 (위상 및 진폭 표현)
    subplot(2,1,2);
    polarplot(angle(z), abs(z), '.');
    title('CIR Polar Plot');

    % Figure를 JPEG 파일로 저장하기
    figureFilename = sprintf('Figure%d.jpg',fileIndex);
    saveas(gcf, figureFilename);   % 필터링된 데이터를 'CIR_Data_Filtered.jpg'로 저장
    disp('시각화 완료 및 JPEG 파일로 저장되었습니다.');

    %close(gcf);
    fileIndex = fileIndex + 1;

    %%%figure 2 진폭 + 위상%%%
    break
end